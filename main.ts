function calculate_acceralaton_sum () {
    i = 0
    current_acceralation_sum = 0
    for (let index = 0; index < 3; index++) {
        current_acceralation_sum += acceralation_list_x_y_z[i]
        i += 1
    }
}
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
    last_update_time_ms = input.runningTime()
}
function update_current_speed () {
    current_time_ms = input.runningTime()
    time_delta = current_time_ms - last_update_time_ms
    if (time_delta <= 0) {
        _ = 0
    } else {
        acceralation_list_x_y_z = [input.acceleration(Dimension.X), input.acceleration(Dimension.Y), input.acceleration(Dimension.Z)]
        calculate_acceralaton_sum()
        if (current_acceralation_sum <= 0) {
            _ = 0
        } else {
            last_update_time_ms = current_time_ms
            speed_delta = Math.sqrt(acceralation_list_x_y_z[0] * g_to_km_ss + (acceralation_list_x_y_z[1] * g_to_km_ss + acceralation_list_x_y_z[2] * g_to_km_ss)) * (time_delta * 0.001) + current_speed
            current_speed += speed_delta
        }
    }
}
function reset_button_state () {
    button_a_queue = 0
    button_b_queue = 0
    button_a_and_b_queue = 0
}
let speed_delta = 0
let time_delta = 0
let current_time_ms = 0
let last_update_time_ms = 0
let _ = 0
let acceralation_list_x_y_z: number[] = []
let current_acceralation_sum = 0
let i = 0
let speed_limit = 0
let current_speed = 0
let button_a_and_b_queue = 0
let button_b_queue = 0
let button_a_queue = 0
let is_listening_to_buttons = 0
let display_limit = 0
let g_to_km_ss = 0
g_to_km_ss = 0.009806
display_limit = 1
is_listening_to_buttons = 1
input.setAccelerometerRange(AcceleratorRange.EightG)
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
is_listening_to_buttons = 1
initialize_current_speed()
while (true) {
    update_current_speed()
    if (button_a_queue == 1 || button_b_queue == 1) {
        basic.showNumber(current_speed)
        reset_button_state()
    } else if (button_a_and_b_queue == 1) {
        for (let index = 0; index < 3; index++) {
            basic.clearScreen()
            basic.pause(100)
            basic.showNumber(0)
        }
        initialize_current_speed()
        reset_button_state()
    }
    if (current_speed >= speed_limit) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
}
