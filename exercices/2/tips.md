# Tips `nearestDirtyPiece`

## 1 (petit tips)

On va récupérer la position du robot et regarder si la case actuelle est `sale`, si oui, on retourne la position du robot !

```js
nearestDirtyPiece() {
  const position = this.robot.position;

  // check if the robot is on a dirty piece
  if (this.layout[position[0]][position[1]].isDirty) {
    return position;
  }
}
```

## 2 (tips de logique)

Pour trouver la pièce la plus proche de notre robot, on va parcourir tous les cases de notre maison et calculer la distance entre le robot et la case.

On va créer deux variables :

- `nearestDirtyPiece` : la pièce la plus proche actuellement
- `nearestDistance` : la distance entre le robot est la pièce

Pour chaque itération de notre tableau, on va venir calculer la distance uniquement si la pièce est `dirty`.

Si la distance est plus grande que l'actuelle `nearestDistance`, on va mettre à jour `nearestDistance` et `nearestDirtyPiece`.

---

Spoiler

---

## 3 (tips de pseudo code)

Pour faire ce qu'on a fait au dessus on ferrait un truc du genre :

```js
let nearestDirtyPiece = null;
let nearestDistance = null;

for (let i = 0; i < this.layout.length; i++) {
  for (let j = 0; j < this.layout[i].length; j++) {
    // Regarder si la pièce est sale
    if (this.layout[i][j].isDirty) {
      // Calculer la distance (en valeur absolue)
      // Si la distance est plus grande que l'actuelle, on met à jour les variables
    }
  }
}
```

## 4 (tips de code)

```js
let nearestDirtyPiece = null;
let nearestDistance = null;
for (let i = 0; i < this.layout.length; i++) {
  for (let j = 0; j < this.layout[i].length; j++) {
    if (this.layout[i][j].isDirty) {
      const distance = Math.abs(position[0] - i) + Math.abs(position[1] - j);

      if (nearestDistance === null || distance < nearestDistance) {
        nearestDistance = distance;
        nearestDirtyPiece = [i, j];
      }
    }
  }
}
```

# Tips `doWork`

## 1 (tips de logique)

On va prendre en paramètre la `house` et stocké la valeur de `nearestDirtyPiece` dans une variable.

Si il n'y pas de `nearestDirtyPiece` c'est qu'il n'y a rien à nettoyer.

## 2 (tips pour trouver le delta)

Pour trouver le delta, on va comparer la position du robot avec la position actuelle de la `nearestDirtyPiece`.

Pour ça :

```js
const robotPosition = this.position;
const deltaX = nearestDirtyPiece[0] - robotPosition[0];
// ...
```

Si le `deltaX` et le `deltaY` sont égal à 0, dans ce cas on appel `this.clean` pour nettoyer la case.

## 3 (tips de position)

Pour déplacer le robot, on va utiliser la méthode `move` qui prend en paramètre le `deltaX` et le `deltaY`.

```js
if (deltaX > 0) {
  this.move(1, 0);
} else if (deltaX < 0) {
  this.move(-1, 0);
} else if (deltaY > 0) {
  this.move(0, 1);
} else if (deltaY < 0) {
  this.move(0, -1);
}
```

Comme ça on gère toutes les possibilités.

Finalement on retourne `true` pour dire que le robot a bien fait son travail.
