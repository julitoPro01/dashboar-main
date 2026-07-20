
// En configuración o base de datos
const SKU_CONFIG = {
  prefix: 'VT',       // VT = Variant
  separator: '-',
  attributeLimit: 3
};

export const generateSku = (
  attributes:any[], // AttributeDetailsResponse[],
  sequence?: number
): string => {
  // Parte 1: Prefijo configurable
  const prefix = SKU_CONFIG.prefix;
  
  // Parte 2: Código de atributos
  const attributePart = attributes
    .filter(attr => attr.value)
    .slice(0, SKU_CONFIG.attributeLimit)
    .map(attr => {
      // Crear hash corto del atributo+valor
      const str = `${attr.keyId}${attr.valueId || attr.value}`;
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convertir a 32-bit
      }
      return Math.abs(hash).toString(36).slice(0, 2).toUpperCase();
    })
    .join('');
  
  // Parte 3: Secuencia o timestamp
  const sequencePart = sequence 
    ? sequence.toString().padStart(4, '0')
    : Date.now().toString(36).slice(-4).toUpperCase();
  
  return [prefix, attributePart || '000', sequencePart]
    .join(SKU_CONFIG.separator);
};
// Ejemplo: "VT-A7B3-X1Y2"