new Vue({
    el: "#app",
    data: {
        inGame: false,
        playerHealth: 100,
        monsterHealth: 100,
        gameLog: []
    },
    methods: {
        startGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameLog.splice(0, this.gameLog.length);
            this.inGame = true;
        },
        attack: function() {
            this.playerAttack(1, 5);
            this.checkWin();

            this.monsterAttack(1, 5);
            this.checkWin();
        },
        specialAttack: function() {
            this.playerAttack(5, 20);
            this.checkWin();

            this.monsterAttack(5, 20);
            this.checkWin();
        },
        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.gameLog.unshift({ 
                isPlayer: true,
                text: "Player used heal"
            });
            
            this.monsterAttack(1, 5);
            
            this.checkStatus();
        },
        giveUp: function() {
            if(confirm("Are you sure you want to give up?")) {
                this.startGame();
            }
        },

        calculateDamage: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        checkWin: function() {
            if(this.playerHealth <= 0 && this.monsterHealth > 0) {
                if(confirm("You lost. \r\nNew game?")) {
                    this.startGame();
                } else {
                    this.inGame = false;
                }
            } else if(this.playerHealth > 0 && this.monsterHealth <= 0) {
                if(confirm("You won. \r\nNew game?")) {
                    this.startGame();
                } else {
                    this.inGame = false;
                }
            }

            return false;
        },
        monsterAttack: function(min, max) {
            var playerHit = this.calculateDamage(1, 5);
            this.playerHealth -= playerHit;
            this.gameLog.unshift({
                isPlayer: false,
                text: "Monster used attack and took " + playerHit + " HP"
            });
        },
        playerAttack: function(min, max) {
            var monsterHit = this.calculateDamage(5, 20);
            this.monsterHealth -= monsterHit;
            this.gameLog.unshift({ 
                isPlayer: true,
                text: "Player used attack and took " + monsterHit + " HP"
            });
        }
    },
    computed: {
        playerHealthBar: function() {
            return {
                width: this.playerHealth + '%'
            }
        },
        monsterHealthBar: function() {
            return {
                width: this.monsterHealth + '%'
            }
        }
    }
});