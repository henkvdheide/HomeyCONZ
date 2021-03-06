'use strict'

const Sensor = require('../Sensor')
const Homey = require('homey')

class Cube extends Sensor {
	
	onInit() {
		super.onInit()
		
		this.setTriggers()
		this.setConditions()
		
		this.log(this.getName(), 'has been initiated')
	}
	
	fireEvent(number, initial=false, gesture=null) {
		if (gesture == 3 || gesture == 4) {
			let side = parseInt(number.toString().charAt(0)) // first digit
			this.setCapabilityValue('side_up', side)
			if (initial) return
		}
		if (gesture == 0) {
			this.log('wake_up')
			this.triggerWakedUp.trigger(this)
		} else if (gesture == 1) {
			this.log('shake')
			this.triggerShaked.trigger(this)
		} else if (gesture == 2) {
			this.log('drop')
			this.triggerDropped.trigger(this)
		} else if (gesture == 3) {
			this.log('flip90')
			this.triggerFlipped90.trigger(this)
		} else if (gesture == 4) {
			this.log('flip180')
			this.triggerFlipped180.trigger(this)
		} else if (gesture == 5) {
			this.log('push')
			this.triggerPushed.trigger(this)
		} else if (gesture == 6) {
			this.log('double tapped')
			this.triggerDoubleTapped.trigger(this)
		} else if (gesture == 7 || gesture == 8) {
			this.log('rotated', number)
			this.triggerRotated.trigger(this, {degrees: number})
		}
	}
	
	setTriggers() {
		this.triggerDoubleTapped = new Homey.FlowCardTriggerDevice('double_tap').register()
		this.triggerPushed = new Homey.FlowCardTriggerDevice('push').register()
		this.triggerWakedUp = new Homey.FlowCardTriggerDevice('wake_up').register()
		this.triggerShaked = new Homey.FlowCardTriggerDevice('shake').register()
		this.triggerDropped = new Homey.FlowCardTriggerDevice('drop').register()
		this.triggerRotated = new Homey.FlowCardTriggerDevice('rotate').register()
		this.triggerFlipped90 = new Homey.FlowCardTriggerDevice('flip90').register()
		this.triggerFlipped180 = new Homey.FlowCardTriggerDevice('flip180').register()
	}

	setConditions() {
		this.isFirstSide = new Homey.FlowCardCondition('is_first_side').registerRunListener((args, state, callback) => {
			console.log(args.device.side)
			callback(null, args.device.getCapabilityValue('side_up') == 1)
		}).register()
		this.isSecondSide = new Homey.FlowCardCondition('is_second_side').registerRunListener((args, state, callback) => {
			console.log(args.device.side)
			callback(null, args.device.getCapabilityValue('side_up') == 2)
		}).register()
		this.isThirdSide = new Homey.FlowCardCondition('is_third_side').registerRunListener((args, state, callback) => {
			console.log(args.device.side)
			callback(null, args.device.getCapabilityValue('side_up') == 3)
		}).register()
		this.isFourthSide = new Homey.FlowCardCondition('is_fourth_side').registerRunListener((args, state, callback) => {
			console.log(args.device.side)
			callback(null, args.device.getCapabilityValue('side_up') == 4)
		}).register()
		this.isFifthSide = new Homey.FlowCardCondition('is_fifth_side').registerRunListener((args, state, callback) => {
			console.log(args.device.side)
			callback(null, args.device.getCapabilityValue('side_up') == 5)
		}).register()
		this.isSixthSide = new Homey.FlowCardCondition('is_sixth_side').registerRunListener((args, state, callback) => {
			console.log(args.device.side)
			callback(null, args.device.getCapabilityValue('side_up') == 6)
		}).register()
	}
	
}

module.exports = Cube