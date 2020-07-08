input.onButtonPressed(Button.A, function () {
    if (is_listening_to_buttons == 1) {
        if (button_b_queue == 1) {
            _ = 0
        } else {
            button_a_queue = 1
        }
    } else {
        _ = 0
    }
})
input.onButtonPressed(Button.AB, function () {
    if (is_listening_to_buttons == 1) {
        button_a_and_b_queue = 1
    } else {
        _ = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (is_listening_to_buttons == 1) {
        if (button_a_queue == 1) {
            _ = 0
        } else {
            button_b_queue = 1
        }
    } else {
        _ = 0
    }
})
function change_speed_limit (delta: number) {
    if (display_limit + delta <= 0 || display_limit + delta > 9) {
        _ = 0
    } else {
        display_limit += delta
        speed_limit += delta * 10
    }
}
function initialize_current_speed () {
    current_speed = 0
    last_update_time = input.runningTimeMicros()
}
function reset_button_state () {
    button_a_queue = 0
    button_b_queue = 0
    button_a_and_b_queue = 0
}
let last_update_time = 0
let current_speed = 0
let speed_limit = 0
let _ = 0
let button_a_and_b_queue = 0
let button_b_queue = 0
let button_a_queue = 0
let is_listening_to_buttons = 0
let display_limit = 0
display_limit = 1
is_listening_to_buttons = 1
while (true) {
    basic.showString("LIM?")
    if (button_a_queue == 1 || button_b_queue == 1) {
        is_listening_to_buttons = 0
        reset_button_state()
        break;
    }
}
is_listening_to_buttons = 1
while (true) {
    basic.showNumber(display_limit)
    if (button_a_queue == 1) {
        reset_button_state()
        change_speed_limit(-1)
    } else if (button_b_queue == 1) {
        change_speed_limit(1)
        reset_button_state()
    } else if (button_a_and_b_queue == 1) {
        reset_button_state()
        is_listening_to_buttons = 0
        for (let index = 0; index < 3; index++) {
            basic.clearScreen()
            basic.pause(100)
            basic.showNumber(display_limit)
        }
        basic.clearScreen()
        break;
    }
}
basic.showIcon(IconNames.Happy)
