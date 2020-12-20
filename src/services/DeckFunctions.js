import {EventBus} from '../main';
import GlobalData from './GlobalData';

const DeckFunctions = {
    created: function() {
        this.currentCard = null;
        this.dealtCards = GlobalData.dealtCards;
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
        resetField: function(e, time1, time2) {
            EventBus.$emit('loading', null);
            this.collectAllCards(e, 'card');
            setTimeout(() => {
            this.shuffleCards(e, 'card');
            }, time1);
            setTimeout(() => {
            this.moveToOriginalPosition('card');
            }, time2);
        },
        resetBlackjack: function(e, time1, time2) {
            EventBus.$emit('loading', null);
            this.resetCardVisibility();
            this.collectAllCards(e, 'card');
            this.collectAllCards(e, 'deck-card');
            setTimeout(() => {
            this.shuffleCards(e, 'card');
            this.shuffleCards(e, 'deck-card');
            }, time1);
            setTimeout(() => {
            this.moveToOriginalPosition('card');
            this.moveToOriginalPosition('deck-card');
            }, time2);
        },
        resetCardVisibility: function() {
            this.dealtCards.forEach(card => {
                card.style.visibility = 'visible';
            });
            this.dealtCards.clear();
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
        shuffleCards: function(e, cardName) {
            if (e !== null) {
                e.stopPropagation();
            }
            let index = 0;
            let deck = document.getElementsByClassName(cardName);
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
        collectAllCards: function(e, cardName) {
            if (e !== null) {
                e.stopPropagation();
            }
            let deck = document.getElementsByClassName(cardName);
            let extra_y = 0;
        
            deck.forEach(card => {
                let current_position = this.calculateElementPosition(card);
                let newXPosition = (window.innerWidth / 2) - current_position.left - (card.offsetWidth / 2);
                let newYPosition = (window.innerHeight / 2) - current_position.top - extra_y - (card.offsetHeight / 2);
                if (card.classList.contains('is-flipped')) {
                    card.classList.toggle('is-flipped');
                }
                card.style.transition = '';
                card.style.transform = `translate(${newXPosition}px, ${newYPosition}px)`;
                card.currentX = newXPosition;
                card.currentY = newYPosition;
                extra_y += 1;
            });
        },
        moveCardToPlayer: function(id, alreadyToggled) {
            //Collects all cards in deck
            let deck = document.getElementsByClassName('deck-card');
            let adjacentCard = document.getElementById(id);
            //Finds position of card adjacent to where it should be
            let newPosition = this.calculateElementPosition(adjacentCard);

            for (let i = 0; i < deck.length; i++) {
                let card = deck[i];
                let url = card.getAttribute('url');
                if (this.dealtCards.get(url) === undefined) {
                    let oldPosition = this.calculateElementPosition(card);
                    let newXPosition = newPosition.left - oldPosition.left + 60;
                    let newYPosition = newPosition.top - oldPosition.top;
                    card.style.transition = 'transform .5s';
                    card.style.transform = `translate(${newXPosition}px, ${newYPosition}px)`;
                    card.currentX = newXPosition;
                    card.currentY = newYPosition;
                    this.dealtCards.set(url, card);

                    // Checks if the card has already been revealed before to make effect work
                    if (alreadyToggled) {
                        setTimeout(() => {
                            adjacentCard.classList.toggle('is-flipped');
                        }, 500);
                        setTimeout(() => {
                            card.style.visibility = "hidden";
                            adjacentCard.classList.toggle('is-flipped');
                        }, 900);
                    } else {
                        setTimeout(() => {
                            card.style.visibility = "hidden";
                            adjacentCard.classList.toggle('is-flipped');
                        }, 900);
                    }
                    return url;
                }
            }
        },
        moveToOriginalPosition: function(cardName) {
            let deck = document.getElementsByClassName(cardName);

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