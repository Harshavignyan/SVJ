const calculatePadham = (lengthFeet, lengthInches, widthFeet, widthInches) => {
    // Adjust for inches > 9 or borrow from feet if needed
    let newLengthFeet = lengthFeet;
    let newLengthInches = lengthInches - 9;
    if (newLengthInches < 0) {
        newLengthFeet -= 1;
        newLengthInches += 12;
    }

    let newWidthFeet = widthFeet;
    let newWidthInches = widthInches - 9;
    if (newWidthInches < 0) {
        newWidthFeet -= 1;
        newWidthInches += 12;
    }

    // Convert to decimal by dividing inches by 12
    const lengthInDecimal = newLengthFeet + (newLengthInches / 12);
    const widthInDecimal = newWidthFeet + (newWidthInches / 12);

    // Calculate diagonal in decimal
    const diagonalDecimal = Math.sqrt(lengthInDecimal ** 2 + widthInDecimal ** 2);

    // Convert diagonal to feet and inches
    const diagonalFeet = Math.floor(diagonalDecimal);
    const diagonalInches = Math.round((diagonalDecimal - diagonalFeet) * 12);

    // Calculate square feet
    const squareFeet = lengthInDecimal * widthInDecimal;

    // Calculate the total padham (updated formula: squareFeet / 9)
    const totalPadham = squareFeet / 9;

    // Calculate the plinth area (outer to outer)
    const plinthArea = (lengthFeet + (lengthInches / 12)) * (widthFeet + (widthInches / 12));

    // Additional calculations using Math.ceil for rounding
    const dhanam = Math.ceil((totalPadham * 8) % 12);
    const rinam = Math.ceil((totalPadham * 3) % 8);
    const vaaramu = Math.ceil((totalPadham * 9) % 7);
    const tithi = Math.ceil((totalPadham * 6) % 30);
    const nakshatramu = Math.ceil((totalPadham * 8) % 27);
    const aayam = Math.ceil((totalPadham * 9) % 8);
    const aayushu = Math.ceil((totalPadham * 9) % 120);
    const amsa = Math.ceil((totalPadham * 6) % 9);
    const dikhpati = Math.ceil(aayushu % 8);

    // Respond with the required values, including diagonal in feet and inches
    return {
        centerLengthFeet: newLengthFeet,
        centerLengthInches: newLengthInches.toFixed(1),
        centerWidthFeet: newWidthFeet,
        centerWidthInches: newWidthInches.toFixed(1),
        lengthInDecimal: lengthInDecimal.toFixed(6),
        widthInDecimal: widthInDecimal.toFixed(6),
        diagonalFeet: diagonalFeet,
        diagonalInches: diagonalInches,
        squareFeet: squareFeet.toFixed(6),
        totalPadham: totalPadham.toFixed(6),
        plinthArea: plinthArea.toFixed(6),
        dhanam: dhanam,
        rinam: rinam,
        vaaramu: vaaramu,
        tithi: tithi,
        nakshatramu: nakshatramu,
        aayam: aayam,
        aayushu: aayushu,
        amsa: amsa,
        dikhpati: dikhpati
    };
};

module.exports = { calculatePadham };
