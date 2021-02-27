import CardInfo from './CardInfo';

// These functions are used to get info about cards like their value or if they are copies
const CardFunctions = {
    created: function() {
        let cardInfo = new CardInfo();
        this.info = new Map();
        this.urls = [];
        this.cards = cardInfo.getCards();
        this.specialCards = cardInfo.getSpecialCards();
        this.cards.forEach(card => {
            this.info.set(card.url, card);
            this.urls.push(card.url);
        });
    },
    methods: {
        getInfo: function() {
            return this.info;
        },
        getCard: function(url) {
            return this.info.get(url);
        },
        getValue: function(char) {
            if (char === 'A') {
                return 1;
            } else if (char === 'J' || char === 'K' || char === 'Q' || char === 'T') {
                return 10;
            } else {
                return Number(char);
            }
        },
        getCardValue: function(url) {
            let card = this.info.get(url);
            return card.number;
        },
        getUrls: function() {
            return this.urls;
        },
        resetCards: function () {
            this.info = new Map();
            this.cards.forEach(card => {
                this.info.set(card.url, card);
            });
        },
        shuffleUrls: function() {
            let i = this.urls.length,
            j = 0,
            temp;
            while (i--) {
                j = Math.floor(Math.random() * (i+1));
    
                // swap randomly chosen element with current element
                temp = this.urls[i];
                this.urls[i] = this.urls[j];
                this.urls[j] = temp;
    
            }
        },
        shuffleGivenUrls: function(givenUrls) {
            let i = givenUrls.length,
            j = 0,
            temp;
            while (i--) {
                j = Math.floor(Math.random() * (i+1));
    
                // swap randomly chosen element with current element
                temp = givenUrls[i];
                givenUrls[i] = givenUrls[j];
                givenUrls[j] = temp;
            }
            return givenUrls;
        },
        isCopy: function(url1, url2) {
            return url1.localeCompare(url2) === 0;
        }
    }
}

export default CardFunctions;