

export const templateRoutes = {
  create: "/templates/create",
  update: "/templates/update", 
  delete: "/templates/delete",
  getById: (id) => `/templates/${id}`,
  getAll: "/templates/all",
};

export const authRoutes = {
  login: "/auth/login",
  profile: "/auth/profile",
};

export default { templateRoutes, authRoutes };
