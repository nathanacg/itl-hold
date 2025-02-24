export function generateSequence() {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var digits = '0123456789';
    var sequence = '';

    for (var i = 0; i < 3; i++) {
        var randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        sequence += randomLetter;
    }

    for (var j = 0; j < 5; j++) {
        var randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
        sequence += randomDigit;
    }

    return sequence;
}