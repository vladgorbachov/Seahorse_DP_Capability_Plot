import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export class DataExporter {
  static async exportToPDF(data, plotImage) {
    const pdf = new jsPDF();

    // Добавляем заголовок
    pdf.setFontSize(16);
    pdf.text('DP Capability Analysis Report', 20, 20);

    // Добавляем дату
    pdf.setFontSize(12);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

    // Добавляем параметры окружающей среды
    pdf.text('Environmental Conditions:', 20, 45);
    pdf.setFontSize(10);
    pdf.text(`Wind Speed: ${data.environment.windSpeed} kts`, 25, 55);
    pdf.text(`Wind Direction: ${data.environment.windDirection}°`, 25, 60);
    pdf.text(`Current Speed: ${data.environment.currentSpeed} kts`, 25, 65);
    pdf.text(`Current Direction: ${data.environment.currentDirection}°`, 25, 70);

    // Добавляем состояние движителей
    pdf.setFontSize(12);
    pdf.text('Thruster Status:', 20, 85);
    pdf.setFontSize(10);
    Object.entries(data.thrusters).forEach(([id, thruster], index) => {
      pdf.text(
        `${id}: ${thruster.active ? 'Active' : 'Inactive'} (${thruster.power}%)`,
        25,
        95 + index * 5
      );
    });

    // Добавляем график
    if (plotImage) {
      pdf.addPage();
      pdf.addImage(plotImage, 'PNG', 20, 20, 170, 170);
    }

    // Сохраняем PDF
    pdf.save('dp-capability-report.pdf');
  }

  static async exportToExcel(data) {
    const wb = XLSX.utils.book_new();
    
    // Создаем лист с параметрами окружающей среды
    const environmentData = [
      ['Parameter', 'Value', 'Unit'],
      ['Wind Speed', data.environment.windSpeed, 'kts'],
      ['Wind Direction', data.environment.windDirection, 'deg'],
      ['Current Speed', data.environment.currentSpeed, 'kts'],
      ['Current Direction', data.environment.currentDirection, 'deg']
    ];
    
    const envWS = XLSX.utils.aoa_to_sheet(environmentData);
    XLSX.utils.book_append_sheet(wb, envWS, 'Environment');

    // Создаем лист с данными движителей
    const thrusterData = [['Thruster ID', 'Type', 'Status', 'Power (%)', 'Max Power (kW)']];
    Object.entries(data.thrusters).forEach(([id, thruster]) => {
      thrusterData.push([
        id,
        thruster.type,
        thruster.active ? 'Active' : 'Inactive',
        thruster.power,
        thruster.maxPower
      ]);
    });
    
    const thrusterWS = XLSX.utils.aoa_to_sheet(thrusterData);
    XLSX.utils.book_append_sheet(wb, thrusterWS, 'Thrusters');

    // Создаем лист с данными расчета
    const calculationData = [
      ['Angle', 'Capability (kts)'],
      ...data.capabilityData.map(point => [point.angle, point.value])
    ];
    
    const calcWS = XLSX.utils.aoa_to_sheet(calculationData);
    XLSX.utils.book_append_sheet(wb, calcWS, 'Calculations');

    // Сохраняем файл
    XLSX.writeFile(wb, 'dp-capability-analysis.xlsx');
  }
}