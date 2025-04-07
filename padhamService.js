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

    // Helper function to handle zero values
    const getDisplayValue = (value, max) => value === 0 ? max : value;
    const getDBValue = (value) => value; // Use original value for DB query

    // Calculations
    const dhanam = Math.ceil((totalPadham * 8) % 12);
    const rinam = Math.ceil((totalPadham * 3) % 8);
    
    // Vaaramu (0-6) - Sunday to Saturday
    const vaaramuDB = Math.ceil((totalPadham * 9) % 7) % 7;
    const vaaramuDisplay = getDisplayValue(vaaramuDB, 7);

    // Tithi (1-30) - No zero case
    const tithi = Math.ceil((totalPadham * 6) % 30) || 30;

    // Nakshatramu (0-26)
    const nakshatramuDB = Math.ceil((totalPadham * 8) % 27) % 27;
    const nakshatramuDisplay = getDisplayValue(nakshatramuDB, 27);

    // Aayam (0-7)
    const aayamDB = (Math.ceil((totalPadham * 9) % 8)) % 8;
    const aayamDisplay = getDisplayValue(aayamDB, 8);

    // Aayushu (1-120) - No zero case
    const aayushu = Math.ceil((totalPadham * 9) % 120) || 120;

    // Amsa (0-8)
    const amsaDB = (Math.ceil((totalPadham * 6) % 9)) % 9;
    const amsaDisplay = getDisplayValue(amsaDB, 9);

    // Dikhpati (1-8) - No zero case
    const dikhpati = Math.ceil(aayushu % 8) || 8;

    return {
        // Dimensions
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
        
        // Values for display
        dhanam: dhanam,
        rinam: rinam,
        vaaramu: vaaramuDisplay,
        tithi: tithi,
        nakshatramu: nakshatramuDisplay,
        aayam: aayamDisplay,
        aayushu: aayushu,
        amsa: amsaDisplay,
        dikhpati: dikhpati,
        
        // Values for DB lookup
        _vaaramuDB: vaaramuDB,
        _tithiDB: tithi,
        _nakshatramuDB: nakshatramuDB,
        _aayamDB: aayamDB,
        _amsaDB: amsaDB,
        _dikhpatiDB: dikhpati
    };
};

module.exports = { calculatePadham };