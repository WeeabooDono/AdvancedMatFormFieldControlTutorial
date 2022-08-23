export function getWidgetMissingInterfaceError(): Error {
  return Error('Le contenu doit être un composant qui implémente l\'interface Widget');
}
