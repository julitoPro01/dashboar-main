# Comandos de Git

## Revisar el estado y los cambios
- `git status` — ver archivos modificados y la rama actual.
- `git diff` — revisar los cambios que aún no están preparados.
- `git diff --staged` — revisar los cambios preparados para el commit.
- `git branch` — listar las ramas locales.
- `git branch -a` — listar ramas locales y remotas.

## Crear y cambiar de rama
- `git switch -c nombre-rama` — crear una rama y cambiar a ella.
- `git switch nombre-rama` — cambiar a una rama existente.

## Guardar cambios
- `git add archivo` — preparar un archivo específico.
- `git add .` — preparar todos los cambios del directorio actual.
- `git commit -m "Descripción del cambio"` — crear un commit con los cambios preparados.

## Sincronizar con el remoto
- `git fetch` — descargar información nueva del remoto sin integrar cambios.
- `git pull` — descargar e integrar cambios de la rama remota configurada.
- `git push -u origin nombre-rama` — publicar la rama por primera vez y configurar su seguimiento remoto.
- `git push` — publicar commits posteriores de la rama configurada.

## Integrar una rama
- `git switch rama-destino` — cambiar a la rama que recibirá los cambios.
- `git merge nombre-rama` — integrar la rama indicada en la rama actual.

## Eliminar una rama local
- `git branch -d nombre-rama` — eliminar una rama ya integrada.
