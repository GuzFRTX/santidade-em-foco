export const CINEMATIC_ROUTE_PATHS = ['/', '/projetos', '/orcamento'] as const;

const cinematicRoutePathSet = new Set<string>(CINEMATIC_ROUTE_PATHS);

function normalizePath(path: string) {
  if (!path) {
    return '';
  }

  if (path === '/') {
    return path;
  }

  return path.replace(/\/+$/, '');
}

export function shouldUseCinematicRouteTransition(fromPath: string, toPath: string) {
  const from = normalizePath(fromPath);
  const to = normalizePath(toPath);

  return from !== to && cinematicRoutePathSet.has(from) && cinematicRoutePathSet.has(to);
}
