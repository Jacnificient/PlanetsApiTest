const ajvInstance = require('./ajv-instance');

const schema = {
    type: "object",
    properties: {
      name: {type: "string"},
      rotation_period: {type: "string"},
      orbital_period: {type: "string"},
      diameter: {type: "string"},
      climate: {type: "string"},
      gravity: {type: "string"},
      terrain: {type: "string"},
      surface_water: {type: "string"},
      population: {type: "string"},
      residents: {type: "array"},
      films: {type: "array"},
      created: {type: "string"},
      edited: {type: "string"},
      url: {type: "string"},
    },
    required: ["name","url"],
    additionalProperties: false
  };

  module.export = ajvInstance.compile(schema);