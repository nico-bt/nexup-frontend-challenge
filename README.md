# Nexup Frontend Challenge

### Live: 🔗https://nexup-frontend-challenge-kappa.vercel.app/  
  
Los datos se obtienen de https://mock-back.vercel.app/api/products  
Solo creé ese GET enpdoint para hacer llamado tipo API Rest.

## Filtros
Se puede:
- Filtrar por categoría  
- Filtrar por disponibilidad de stock  
- Filtrar por estado  
- Búsqueda full-text con debounce  

Los filtros se manejan mediante:

- Un objeto unificado de `filters` (category, stock, status)
- Un input de búsqueda con debounce
- Un único `useMemo` que centraliza la lógica de filtrado

Este enfoque permite:

- Agregar nuevos filtros fácilmente
- Mantener una sola fuente de verdad
- Evitar estado derivado innecesario


## Consideraciones de Escalabilidad

El filtrado se realiza en el frontend, lo cual es adecuado para datasets pequeños o medianos.  
En aplicaciones con grandes volúmenes de datos o consultas complejas, podría ser mejor realizar el filtrado en el backend, incorporando:

- Filtrado server-side  
- Paginación  
- Envío parcial de datos al cliente
  
Ej: Pasando queries en el fetch, se puede manejar lógica en server y evitar enviar datos innecesarios. 

  ```
  fetch(`/api/products?category=Fruit&inStock=true&status=Active&page=1&limit=20`)
  ```

La implementación actual asume un volumen de datos apropiado para procesamiento en cliente.


