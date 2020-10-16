function CardInfo() {
    this.info = new Map();
    this.urls = [];
    this.cards = [
        {
            number: 1,
            suit: 'D',
            url: 'AD',
            name: 'Ace'
        },
        {
            number: 1,
            suit: 'C',
            url: 'AC',
            name: 'Ace'
        },
        {
            number: 1,
            suit: 'H',
            url: 'AH',
            name: 'Ace'
        },
        {
            number: 1,
            suit: 'S',
            url: 'AS',
            name: 'Ace'
        },
        {
            number: 2,
            suit: 'H',
            url: '2H',
            name: '2'
        },
        {
            number: 2,
            suit: 'S',
            url: '2S',
            name: '2'
        },
        {
            number: 2,
            suit: 'D',
            url: '2D',
            name: '2'
        },
        {
            number: 2,
            suit: 'C',
            url: '2C',
            name: '2'
        },
        {
            number: 3,
            suit: 'H',
            url: '3H',
            name: '3'
        },
        {
            number: 3,
            suit: 'S',
            url: '3S',
            name: '3'
        },
        {
            number: 3,
            suit: 'D',
            url: '3D',
            name: '3'
        },
        {
            number: 3,
            suit: 'C',
            url: '3C',
            name: '3'
        },
        {
            number: 4,
            suit: 'H',
            url: '4H',
            name: '4'
        },
        {
            number: 4,
            suit: 'S',
            url: '4S',
            name: '4'
        },
        {
            number: 4,
            suit: 'D',
            url: '4D',
            name: '4'
        },
        {
            number: 4,
            suit: 'C',
            url: '4C',
            name: '4'
        },
        {
            number: 5,
            suit: 'H',
            url: '5H',
            name: '5'
        },
        {
            number: 5,
            suit: 'S',
            url: '5S',
            name: '5'
        },
        {
            number: 5,
            suit: 'D',
            url: '5D',
            name: '5'
        },
        {
            number: 5,
            suit: 'C',
            url: '5C',
            name: '5'
        },
        {
            number: 6,
            suit: 'H',
            url: '6H',
            name: '6'
        },
        {
            number: 6,
            suit: 'S',
            url: '6S',
            name: '6'
        },
        {
            number: 6,
            suit: 'D',
            url: '6D',
            name: '6'
        },
        {
            number: 6,
            suit: 'C',
            url: '6C',
            name: '6'
        },
        {
            number: 7,
            suit: 'H',
            url: '7H',
            name: '7'
        },
        {
            number: 7,
            suit: 'S',
            url: '7S',
            name: '7'
        },
        {
            number: 7,
            suit: 'D',
            url: '7D',
            name: '7'
        },
        {
            number: 7,
            suit: 'C',
            url: '7C',
            name: '7'
        },
        {
            number: 8,
            suit: 'H',
            url: '8H',
            name: '8'
        },
        {
            number: 8,
            suit: 'S',
            url: '8S',
            name: '8'
        },
        {
            number: 8,
            suit: 'D',
            url: '8D',
            name: '7'
        },
        {
            number: 8,
            suit: 'C',
            url: '8C',
            name: '8'
        },
        {
            number: 9,
            suit: 'H',
            url: '9H',
            name: '9'
        },
        {
            number: 9,
            suit: 'S',
            url: '9S',
            name: '9'
        },
        {
            number: 9,
            suit: 'D',
            url: '9D',
            name: '9'
        },
        {
            number: 9,
            suit: 'C',
            url: '9C',
            name: '9'
        },
        {
            number: 10,
            suit: 'H',
            url: 'TH',
            name: '10'
        },
        {
            number: 10,
            suit: 'S',
            url: 'TS',
            name: '10'
        },
        {
            number: 10,
            suit: 'D',
            url: 'TD',
            name: '10'
        },
        {
            number: 10,
            suit: 'C',
            url: 'TC',
            name: '10'
        },
        {
            number: 11,
            suit: 'H',
            url: 'JH',
            name: 'Jack'
        },
        {
            number: 11,
            suit: 'S',
            url: 'JS',
            name: 'Jack'
        },
        {
            number: 11,
            suit: 'D',
            url: 'JD',
            name: 'Jack'
        },
        {
            number: 11,
            suit: 'C',
            url: 'JC',
            name: 'Jack'
        },
        {
            number: 12,
            suit: 'H',
            url: 'QH',
            name: 'Queen'
        },
        {
            number: 12,
            suit: 'S',
            url: 'QS',
            name: 'Queen'
        },
        {
            number: 12,
            suit: 'D',
            url: 'QD',
            name: 'Queen'
        },
        {
            number: 12,
            suit: 'C',
            url: 'QC',
            name: 'Queen'
        },
        {
            number: 13,
            suit: 'H',
            url: 'KH',
            name: 'King'
        },
        {
            number: 13,
            suit: 'S',
            url: 'KS',
            name: 'King'
        },
        {
            number: 13,
            suit: 'D',
            url: 'KD',
            name: 'King'
        },
        {
            number: 13,
            suit: 'C',
            url: 'KC',
            name: 'King'
        }
    ];
    this.specialCards = [
        {
            number: 0,
            suit: 'None',
            url: '1J',
            name: 'Joker'
        },
        {
            url: '1B',
            name: 'Black Background'
        },
        {
            url: '2B',
            name: 'Red Background'
        },
    ]
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
        console.log(this.urls);
        while (i--) {
            j = Math.floor(Math.random() * (i+1));

            // swap randomly chosen element with current element
            temp = this.urls[i];
            this.urls[i] = this.urls[j];
            this.urls[j] = temp;

        }
        console.log(this.urls);
    }

    this.shuffleGivenUrls = function(givenUrls) {
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
    }

    this.isCopy = function(url1, url2) {
        return url1.localeCompare(url2) === 0;
    }
}

export default CardInfo;