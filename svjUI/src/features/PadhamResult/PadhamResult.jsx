import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PadhamResult.css';

const PadhamResult = () => {
  const result = useSelector((state) => state.padham.result);
  const dimensions = useSelector((state) => state.padham.dimensions);

  // Function to determine Dhanam and Rinam status
  const getDhanamStatus = (dhanam, rinam) => {
    if (dhanam > rinam) {
      return { dhanamStatus: 'Adhikam', rinamStatus: 'Swalpam' };
    } else if (dhanam < rinam) {
      return { dhanamStatus: 'Swalpam', rinamStatus: 'Adhikam' };
    } else {
      return { dhanamStatus: 'Equal', rinamStatus: 'Equal' };
    }
  };

  const { dhanamStatus, rinamStatus } = result ? getDhanamStatus(result.dhanam, result.rinam) : {};

  // Function to determine Aayushu status
  const getAayushuStatus = (aayushu) => {
    return aayushu >= 60 ? 'Poorna Ayush' : 'Not Poorna Ayush';
  };

  const aayushuStatus = result ? getAayushuStatus(result.aayushu) : '';

  // Function to generate PDF with result details
  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const darkBrown = [94, 52, 18];
    const accentColor = [139, 69, 19];
    const lightBeige = [245, 235, 220];

    // Background
    doc.setFillColor(...lightBeige);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Top line: Contact left, Since 1954 right
    doc.setFontSize(10);
    doc.setTextColor(...darkBrown);
    doc.setFont('helvetica', 'normal');
    doc.text('Contact: (+91) 9704755446', 10, 12);
    doc.text('Since 1954', pageWidth - 10, 12, { align: 'right' });

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'normal');
    doc.text('Sri Vani Jyothishalayam', pageWidth / 2, 25, { align: 'center' });

    // Name
    doc.setFontSize(16);
    doc.text('Daivajna Sri Ayaluri Ramkumar Sharma', pageWidth / 2, 33, { align: 'center' });

    // Trusted & Qualifications (in same line, aligned beneath the name smartly)
    doc.setFontSize(12);
    doc.setTextColor(...accentColor);
    doc.text('Trusted by intellectuals', 15, 40); // left side under "Daivajna"
    doc.setTextColor(...darkBrown);
    doc.text('BBM, MBA, MA(Astrology)', pageWidth - 15, 40, { align: 'right' }); // right side under name

    // Address: One compressed line
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkBrown);
    const addressText = 'D No: 1-309/3, Arunachala Shiva Heritage, Opp Aditya Jr College, 3rd Left Cement Rd, Komarada Rd, BHIMAVARAM, AP 534208';
    doc.text(addressText, pageWidth / 2, 48, { align: 'center', maxWidth: pageWidth - 20 });

    // Combined Table Data
    const tableData = [
        ['Plinth Area of the Building O2O', result.plinthArea],
        ['Width Outer to Outer', `${dimensions.widthFeet}' - ${dimensions.widthInches}"`],
        ['Length Outer to Outer', `${dimensions.lengthFeet}' - ${dimensions.lengthInches}"`],
        ['Width from Centre to Centre', `${result.centerWidthFeet}' - ${result.centerWidthInches}"`],
        ['Length from Centre to Centre', `${result.centerLengthFeet}' - ${result.centerLengthInches}"`],
        ['Width in Decimals', result.widthInDecimal],
        ['Length in Decimals', result.lengthInDecimal],
        ['Square Feet of Building C2C', result.squareFeet],
        ['Total Padam of Building', result.totalPadham],
        ['Diagonal', `${result.diagonalFeet}' - ${result.diagonalInches}"`],
        ['Dhanam', `${result.dhanam} (${dhanamStatus})`],
        ['Rinam', `${result.rinam} (${rinamStatus})`],
        ['Vaaramu', result.vaaramu ? `${result.vaaramu.key} - ${result.vaaramu.value}` : 'N/A'],
        ['Tithi', result.tithi ? `${result.tithi.key} - ${result.tithi.value}` : 'N/A'],
        ['Nakshatramu', result.nakshatramu ? `${result.nakshatramu.key} - ${result.nakshatramu.value}` : 'N/A'],
        ['Aayam', result.aayam ? `${result.aayam.key} - ${result.aayam.value}` : 'N/A'],
        ['Aayushu', `${result.aayushu} (${aayushuStatus})`],
        ['Amsa', result.amsa ? `${result.amsa.key} - ${result.amsa.value}` : 'N/A'],
        ['Dikhpati', result.dikhpati ? `${result.dikhpati.key} - ${result.dikhpati.value}` : 'N/A']
    ];

    // Add title for combined table
    doc.setFontSize(14);
    doc.setTextColor(...darkBrown);
    doc.setFont('helvetica', 'bold');
    doc.text('Nava Vargu Ganitam', pageWidth / 2, 58, { align: 'center' });

    // Render table
    doc.autoTable({
        startY: 62,
        body: tableData,
        styles: {
            font: 'helvetica',
            fontSize: 12,
            textColor: darkBrown,
            halign: 'center',
            cellPadding: 2
        },
        columnStyles: {
            0: { cellWidth: 90 },
            1: { cellWidth: 'auto' }
        },
        theme: 'plain',
        margin: { left: 15, right: 15 }
    });

    // Footer blessings (single line)
    const blessingLine = 'SHUBHAM BHUYAAT - MANGALAM MAHAT - SRI SRI SRI SRI SRI';
    doc.setFontSize(12);
    const finalY = doc.lastAutoTable.finalY;
    const spaceAboveFooter = pageHeight - 20;
    const adjustedY = finalY > spaceAboveFooter - 10 ? spaceAboveFooter - 10 : spaceAboveFooter;

    doc.text(blessingLine, pageWidth / 2, adjustedY, { align: 'center' });

    // Copyright
    doc.setFontSize(9);
    doc.text('© Sri Vani Jyothishalayam', pageWidth / 2, pageHeight - 8, { align: 'center' });

    // Save
    doc.save('Sri_Vani_Jyothishalayam_Report.pdf');
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {result ? (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-center">Nava Varga Ganitam</h3>
                <div className="row">
                  {/* Left Table */}
                  <div className="col-md-6">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Description</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Plinth Area of the Building O2O</td>
                          <td>{result.plinthArea}</td>
                        </tr>
                        <tr>
                          <td>Width Outer to Outer</td>
                          <td>{dimensions.widthFeet}' - {dimensions.widthInches}"</td>
                        </tr>
                        <tr>
                          <td>Length Outer to Outer</td>
                          <td>{dimensions.lengthFeet}' - {dimensions.lengthInches}"</td>
                        </tr>
                        <tr>
                          <td>Width from Centre to Centre</td>
                          <td>{result.centerWidthFeet}' - {result.centerWidthInches}''</td>
                        </tr>
                        <tr>
                          <td>Length from Centre to Centre</td>
                          <td>{result.centerLengthFeet}' - {result.centerLengthInches}''</td>
                        </tr>
                        <tr>
                          <td>Width in Decimals</td>
                          <td>{result.widthInDecimal}</td>
                        </tr>
                        <tr>
                          <td>Length in Decimals</td>
                          <td>{result.lengthInDecimal}</td>
                        </tr>
                        <tr>
                          <td>Square Feet of Building C2C</td>
                          <td>{result.squareFeet}</td>
                        </tr>
                        <tr>
                          <td>Total Padam of Building</td>
                          <td>{result.totalPadham}</td>
                        </tr>
                        <tr>
                          <td>Diagonal</td>
                          <td>{result.diagonalFeet}' - {result.diagonalInches}''</td> {/* Diagonal in feet and inches */}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Right Table */}
                  <div className="col-md-6">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Field</th>
                          <th scope="col">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Dhanam</td>
                          <td>{result.dhanam} ({dhanamStatus})</td>
                        </tr>
                        <tr>
                          <td>Rinam</td>
                          <td>{result.rinam} ({rinamStatus})</td>
                        </tr>
                        <tr>
                          <td>Vaaramu</td>
                          <td>{result.vaaramu ? `${result.vaaramu.key} - ${result.vaaramu.value}` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td>Tithi</td>
                          <td>{result.tithi ? `${result.tithi.key} - ${result.tithi.value}` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td>Nakshatramu</td>
                          <td>{result.nakshatramu ? `${result.nakshatramu.key} - ${result.nakshatramu.value}` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td>Aayam</td>
                          <td>{result.aayam ? `${result.aayam.key} - ${result.aayam.value}` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td>Aayushu</td>
                          <td>{result.aayushu} ({aayushuStatus})</td>
                        </tr>
                        <tr>
                          <td>Amsa</td>
                          <td>{result.amsa ? `${result.amsa.key} - ${result.amsa.value}` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td>Dikhpati</td>
                          <td>{result.dikhpati ? `${result.dikhpati.key} - ${result.dikhpati.value}` : 'N/A'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={downloadPDF}>Download PDF</button>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center" role="alert">
              No result available yet. Please submit the form.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PadhamResult;
