from flask import Blueprint, request, jsonify
from datetime import datetime
from src.models.user import db
from src.models.booking import Booking

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/bookings', methods=['POST'])
def create_booking():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'phone', 'preferred_date', 'preferred_time']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Parse date
        try:
            preferred_date = datetime.strptime(data['preferred_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Create new booking
        booking = Booking(
            name=data['name'],
            phone=data['phone'],
            email=data.get('email'),
            preferred_date=preferred_date,
            preferred_time=data['preferred_time'],
            message=data.get('message'),
            dog_id=data.get('dog_id'),
            dog_name=data.get('dog_name')
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify({
            'message': 'Booking created successfully',
            'booking': booking.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@booking_bp.route('/bookings', methods=['GET'])
def get_bookings():
    try:
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_bp.route('/bookings/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    try:
        booking = Booking.query.get_or_404(booking_id)
        return jsonify(booking.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_bp.route('/bookings/<int:booking_id>/status', methods=['PUT'])
def update_booking_status(booking_id):
    try:
        data = request.get_json()
        status = data.get('status')
        
        if status not in ['pending', 'confirmed', 'cancelled']:
            return jsonify({'error': 'Invalid status. Must be pending, confirmed, or cancelled'}), 400
        
        booking = Booking.query.get_or_404(booking_id)
        booking.status = status
        db.session.commit()
        
        return jsonify({
            'message': 'Booking status updated successfully',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@booking_bp.route('/bookings/available-times', methods=['GET'])
def get_available_times():
    """Get available time slots for a specific date"""
    try:
        date_str = request.args.get('date')
        if not date_str:
            return jsonify({'error': 'Date parameter is required'}), 400
        
        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Get existing bookings for the date
        existing_bookings = Booking.query.filter(
            Booking.preferred_date == date,
            Booking.status.in_(['pending', 'confirmed'])
        ).all()
        
        booked_times = [booking.preferred_time for booking in existing_bookings]
        
        # Available time slots
        all_times = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']
        available_times = [time for time in all_times if time not in booked_times]
        
        return jsonify({
            'date': date_str,
            'available_times': available_times,
            'booked_times': booked_times
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

