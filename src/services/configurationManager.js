import { FileManager } from './fileManager';

class ConfigurationManager {
  constructor() {
    this.configKey = 'dp-configurations';
    this.maxSavedConfigs = 10;
  }

  async saveConfiguration(config) {
    try {
      // Валидация конфигурации
      if (!this.validateConfiguration(config)) {
        throw new Error('Invalid configuration');
      }

      // Получаем существующие конфигурации
      const savedConfigs = this.getSavedConfigurations();
      
      // Добавляем новую конфигурацию
      const newConfig = {
        ...config,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        name: config.name || `Configuration ${savedConfigs.length + 1}`
      };

      // Добавляем в начало массива
      savedConfigs.unshift(newConfig);

      // Ограничиваем количество сохраненных конфигураций
      if (savedConfigs.length > this.maxSavedConfigs) {
        savedConfigs.pop();
      }

      // Сохраняем обновленный список
      localStorage.setItem(this.configKey, JSON.stringify(savedConfigs));

      return newConfig;
    } catch (error) {
      console.error('Error saving configuration:', error);
      throw error;
    }
  }

  getSavedConfigurations() {
    try {
      const configs = localStorage.getItem(this.configKey);
      return configs ? JSON.parse(configs) : [];
    } catch (error) {
      console.error('Error getting saved configurations:', error);
      return [];
    }
  }

  getConfigurationById(id) {
    const configs = this.getSavedConfigurations();
    return configs.find(config => config.id === id);
  }

  deleteConfiguration(id) {
    try {
      const configs = this.getSavedConfigurations();
      const updatedConfigs = configs.filter(config => config.id !== id);
      localStorage.setItem(this.configKey, JSON.stringify(updatedConfigs));
      return true;
    } catch (error) {
      console.error('Error deleting configuration:', error);
      throw error;
    }
  }

  exportConfiguration(config) {
    try {
      const filename = `dp-config-${config.id}.json`;
      return FileManager.saveToFile(config, filename);
    } catch (error) {
      console.error('Error exporting configuration:', error);
      throw error;
    }
  }

  async importConfiguration(file) {
    try {
      const config = await FileManager.loadFromFile(file);
      if (this.validateConfiguration(config)) {
        return this.saveConfiguration(config);
      }
      throw new Error('Invalid configuration file');
    } catch (error) {
      console.error('Error importing configuration:', error);
      throw error;
    }
  }

  validateConfiguration(config) {
    // Проверка необходимых полей
    const requiredFields = {
      environment: ['windSpeed', 'windDirection', 'currentSpeed', 'currentDirection', 'waveHeight'],
      thrusters: true // Проверяем только наличие объекта
    };

    for (const [key, fields] of Object.entries(requiredFields)) {
      if (!config[key]) return false;
      if (Array.isArray(fields)) {
        for (const field of fields) {
          if (typeof config[key][field] !== 'number') return false;
        }
      }
    }

    // Проверка корректности значений
    const { environment } = config;
    if (
      environment.windSpeed < 0 ||
      environment.currentSpeed < 0 ||
      environment.waveHeight < 0 ||
      environment.windDirection < 0 || environment.windDirection > 360 ||
      environment.currentDirection < 0 || environment.currentDirection > 360
    ) {
      return false;
    }

    return true;
  }
}

export default new ConfigurationManager();