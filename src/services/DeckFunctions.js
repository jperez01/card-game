import {EventBus} from '../main';

const DeckFunctions = {
    created: function() {
        this.currentCard = null;
        this.dealtCards = new Map();
    },
    methods: {
        getCurrentData: function(e) {
            e.stopPropagation();
            if (this.currentCard === null) {
                this.currentCard = e.target;
            } else {
                this.currentCard = null;
            }
        },
        resetField: function(e) {
            EventBus.$emit('loading', null);
            this.collectAllCards(e);
            setTimeout(() => {
            this.shuffleCards(e);
            }, 300);
            setTimeout(() => {
            this.moveToOriginalPosition()
            }, 2600);
        },
        moveCard: function(e) {
            if (this.currentCard !== null) {
                var xPosition = e.clientX - (this.currentCard.offsetWidth / 2);
                var yPosition = e.clientY - (this.currentCard.offsetHeight / 2);
                let value = `translate(${xPosition}px, ${yPosition}px)`;
                this.currentCard.style.transform = value;
                this.currentCard.style.transition = 'transform .3s cubic-bezier(0.075, 0.82, 0.165, 1)';
            }
        },
        shuffleCards: function(e) {
            e.stopPropagation();
            let index = 0;
            let deck = document.getElementsByClassName('card');
            let value = 0;
            deck.forEach(card => {
                if (index % 2 === 0) {
                setTimeout(() => {
                    card.style.transform = `translate(${100 + card.currentX}px, ${card.currentY}px)`;
                }, value);
                setTimeout(() => {
                    card.style.transform = `translate(${ card.currentX}px, ${card.currentY}px)`;
                }, 100 + value);
                setTimeout(() => {
                    card.style.transform = `translate(${-100 + card.currentX}px, ${card.currentY}px)`;
                }, 300 + value);
                setTimeout(() => {
                    card.style.transform = `translate(${ card.currentX}px, ${card.currentY}px)`;
                }, 450 + value);
                value += 50;
                } else {
                setTimeout(() => {
                    card.style.transform = `translate(${-100 + card.currentX}px, ${card.currentY}px)`;
                }, value);
                setTimeout(() => {
                    card.style.transform = `translate(${ card.currentX}px, ${card.currentY}px)`;
                }, 150 + value);
                setTimeout(() => {
                    card.style.transform = `translate(${100 + card.currentX}px, ${card.currentY}px)`;
                }, 350 + value);
                setTimeout(() => {
                    card.style.transform = `translate(${ card.currentX}px, ${card.currentY}px)`;
                }, 500 + value);
                value += 50;
                }
                index++;
            });
            },
        collectAllCards: function(e) {
            e.stopPropagation();
            let deck = document.getElementsByClassName('card');
            let extra_y = 0;
        
            deck.forEach(card => {
                let current_position = this.calculateElementPosition(card);
                let newXPosition = (window.innerWidth / 2) - current_position.left - (card.offsetWidth / 2);
                let newYPosition = (window.innerHeight / 2) - current_position.top - extra_y - (card.offsetHeight / 2);
                card.style.transition = '';
                card.style.transform = `translate(${newXPosition}px, ${newYPosition}px)`;
                card.currentX = newXPosition;
                card.currentY = newYPosition;
                extra_y += 1;
            });
        },
        collectDeckCards: function() {
            let deck = document.getElementsByClassName('deck-card');
            let extra_y = 0;
        
            deck.forEach(card => {
                let newXPosition = 0;
                let newYPosition = -extra_y;
                card.style.transition = '';
                card.style.transform = `translate(${newXPosition}px, ${newYPosition}px)`;
                card.currentX = newXPosition;
                card.currentY = newYPosition;
                extra_y += 1;
            });
        },
        moveCardToPlayer: function(id) {
            let deck = document.getElementsByClassName('deck-card');
            let adjacentCard = document.getElementById(id);
            let newPosition = this.calculateElementPosition(adjacentCard);
            for (let i = 0; i < deck.length; i++) {
                let card = deck[i];
                if (this.dealtCards.get(card.url) !== null) {
                    let newXPosition = newPosition.left;
                    let newYPosition = newPosition.top;
                    card.style.transition = '';
                    card.style.transform = `translate(${newXPosition}px, ${newYPosition + 5}px)`;
                    card.currentX = newXPosition;
                    card.currentY = newYPosition;
                    setTimeout(() => {
                        card.style.visibility = "hidden";
                    }, 2000);
                    break;
                }
            }
        },
        moveToOriginalPosition: function() {
            let deck = document.getElementsByClassName('card');

            deck.forEach(card => {
                let newXPosition = 0;
                let newYPosition = 0;
                card.style.transform = ``;
                card.currentX = newXPosition;
                card.currentY = newYPosition;
            });
            EventBus.$emit('loading', null);
        },
        calculateElementPosition: function(element) {
            var top = 0, left = 0;
            do {
                top += element.offsetTop  || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while(element);

            return {
                top: top,
                left: left
            };
        }
    }
}

export default DeckFunctions;