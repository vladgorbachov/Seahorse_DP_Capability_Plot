export class FileManager {
    static async saveToFile(data, filename) {
      try {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        
        // Симулируем клик для скачивания
        document.body.appendChild(link);
        link.click();
        
        // Очищаем
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        return true;
      } catch (error) {
        console.error('Error saving file:', error);
        throw new Error('Failed to save file');
      }
    }
  
    static async loadFromFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            resolve(data);
          } catch (error) {
            reject(new Error('Invalid file format'));
          }
        };
        
        reader.onerror = () => {
          reject(new Error('Error reading file'));
        };
        
        reader.readAsText(file);
      });
    }
  
    static validateConfiguration(data) {
      // Проверка структуры конфигурационного файла
      const required = ['environment', 'thrusters'];
      
      for (const field of required) {
        if (!data[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
  
      // Проверка данных окружающей среды
      const environmentFields = ['windSpeed', 'windDirection', 'currentSpeed', 'currentDirection'];
      for (const field of environmentFields) {
        if (typeof data.environment[field] !== 'number') {
          throw new Error(`Invalid environment data: ${field}`);
        }
      }
  
      // Проверка данных движителей
      for (const [id, thruster] of Object.entries(data.thrusters)) {
        if (!thruster.type || typeof thruster.active !== 'boolean') {
          throw new Error(`Invalid thruster data: ${id}`);
        }
      }
  
      return true;
    }
  }