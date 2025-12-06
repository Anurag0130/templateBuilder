
export const templates = [];


export const addTemplate = (template) => {
  templates.push(template);
};

export const updateTemplate = (updatedTemplate) => {
  const index = templates?.findIndex(temp => temp?.id === updatedTemplate?.id);
  if (index !== -1) {
    templates[index] = updatedTemplate;
  }
};