import CardInfo from './CardInfo';

function CardFunctions() {
    this.info = new Map();
    this.urls = [];
    this.cards = CardInfo.getCards();
    this.specialCards = CardInfo.getSpecialCards();

    this.cards.forEach(card => {
        this.info.set(card.url, card);
        this.urls.push(card.url);
    });

    this.getInfo = function() {
        return this.info;
    }

    this.getCard = function(url) {
        return this.info.get(url);
    }
    this.getUrls = function() {
        return this.urls;
    }

    this.resetCards = function () {
        this.info = new Map();
        this.cards.forEach(card => {
            this.info.set(card.url, card);
        });
    }

    this.shuffleUrls = function() {
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
    }

    this.shuffleGivenUrls = function(givenUrls) {
        let i = givenUrls.length,
        j = 0,
        temp;
        console.log(givenUrls);
        while (i--) {
            j = Math.floor(Math.random() * (i+1));

            // swap randomly chosen element with current element
            temp = givenUrls[i];
            givenUrls[i] = givenUrls[j];
            givenUrls[j] = temp;
        }
        console.log(givenUrls);
        return givenUrls;
    }

    this.isCopy = function(url1, url2) {
        return url1.localeCompare(url2) === 0;
    }
}

export default CardFunctions;