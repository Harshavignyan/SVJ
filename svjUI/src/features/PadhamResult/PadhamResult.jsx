import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PadhamResult.css'; // Include your CSS

const PadhamResult = () => {
  const result = useSelector((state) => state.padham.result);

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
    const doc = new jsPDF();

    // Define colors for the brown theme
    const brownColor = [139, 69, 19]; // Dark brown color
    const lightBrownColor = [210, 180, 140]; // Light brown color for the address

    // Header: Company Information
    doc.setFontSize(22);
    doc.setTextColor(...brownColor); // Set color to brown for the company name
    doc.text('Sri Vani Jyothishalayam', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(...lightBrownColor); // Light brown for the address
    doc.text('Arunchala Shiva Heritage, 3rd cement road, Komarada Rd', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    doc.text('Opposite Aditya Junior college, Bhimavaram, Andhra Pradesh 534208', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Adjust phone number display with emoji
    doc.setFont('arial', 'normal'); // Or another font that supports emoji
    doc.text('Contact: (+91) 9704755446', doc.internal.pageSize.getWidth() / 2, 42, { align: 'center' });

    // Add page border
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setDrawColor(...brownColor); // Border color
    doc.setLineWidth(1); // Border width
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Add spacing between the contact information and the tables
    const spacing = 60; // Adjust this value as needed
    const startY = 50 + spacing; // Space between header and tables

    // First table (Plinth Area to Diagonal)
    const firstTableRows = [
      ['Plinth Area of the Building O2O', result.plinthArea],
      ['Length from Centre to Centre', `${result.centerLengthFeet}' - ${result.centerLengthInches}"`],
      ['Width from Centre to Centre', `${result.centerWidthFeet}' - ${result.centerWidthInches}"`],
      ['Length in Decimals', result.lengthInDecimal],
      ['Width in Decimals', result.widthInDecimal],
      ['Square Feet of Building C2C', result.squareFeet],
      ['Total Padam of Building', result.totalPadham],
      ['Diagonal', `${result.diagonalFeet}' - ${result.diagonalInches}"`], // Diagonal in feet and inches
    ];

    doc.autoTable({
      head: [['Description', 'Value']],
      body: firstTableRows,
      startY: startY, // Below the header
      theme: 'grid',
      headStyles: { fillColor: brownColor }, // Brown header color
      columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }, // Equal column widths
    });

    // Second table (Dhanam to Dikhpati)
    const secondTableRows = [
      ['Dhanam', `${result.dhanam} (${dhanamStatus})`],
      ['Rinam', `${result.rinam} (${rinamStatus})`],
      ['Vaaramu', result.vaaramu ? `${result.vaaramu.key} - ${result.vaaramu.value}` : 'N/A'],
      ['Tithi', result.tithi ? `${result.tithi.key} - ${result.tithi.value}` : 'N/A'],
      ['Nakshatramu', result.nakshatramu ? `${result.nakshatramu.key} - ${result.nakshatramu.value}` : 'N/A'],
      ['Aayam', result.aayam ? `${result.aayam.key} - ${result.aayam.value}` : 'N/A'],
      ['Aayushu', `${result.aayushu} (${aayushuStatus})`],
      ['Amsa', result.amsa ? `${result.amsa.key} - ${result.amsa.value}` : 'N/A'],
      ['Dikhpati', result.dikhpati ? `${result.dikhpati.key} - ${result.dikhpati.value}` : 'N/A'],
    ];

    // Calculate the Y position for the second table
    const secondTableStartY = doc.previousAutoTable.finalY + 10; // Start below the first table

    doc.autoTable({
      head: [['Field', 'Result']],
      body: secondTableRows,
      startY: secondTableStartY, // Start below the first table
      theme: 'grid',
      headStyles: { fillColor: brownColor }, // Same brown color
      columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }, // Equal column widths
    });

    // Footer
    doc.setFontSize(14);
    doc.setTextColor(...brownColor); // Brown color for footer
    doc.text(
      'SRI SRI SRI SRI SRI',
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 14, // Position at the bottom
      { align: 'center' }
    );

    // Save PDF
    doc.save('result_with_branding.pdf');
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
                          <td>Length from Centre to Centre</td>
                          <td>{result.centerLengthFeet}' - {result.centerLengthInches}''</td>
                        </tr>
                        <tr>
                          <td>Width from Centre to Centre</td>
                          <td>{result.centerWidthFeet}' - {result.centerWidthInches}''</td>
                        </tr>
                        <tr>
                          <td>Length in Decimals</td>
                          <td>{result.lengthInDecimal}</td>
                        </tr>
                        <tr>
                          <td>Width in Decimals</td>
                          <td>{result.widthInDecimal}</td>
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
