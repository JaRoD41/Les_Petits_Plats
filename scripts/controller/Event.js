// Je crée une classe Event qui va me permettre de créer des événements personnalisés
export class Event {
  // Je crée un constructeur pour initialiser mon tableau d'écouteurs d'événements
	constructor() {
		this.listeners = []
	}

  // Méthode pour ajouter un écouteur d'événement
	addListener(listener) {
		this.listeners.push(listener)
	}

  // Méthode pour déclencher un événement
	trigger(params) {
		this.listeners.forEach((listener) => {
			listener(params)
		})
	}
}

