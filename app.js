new Vue({
    el: "#app",
    data: {
        inGame: false,
        playerHealth: 100,
        monsterHealth: 100,
        gameLog: []
    },
    methods: {
        giveUp: function() {
            if(confirm("Are you sure you want to give up?")) {
                this.restartGame();
            }
        },
        attack: function() {
            this.playerAttack(1, 5);
            this.monsterAttack(1, 5);
            this.checkStatus();
        },
        specialAttack: function() {
            this.playerAttack(5, 20);
            this.monsterAttack(5, 20);
            this.checkStatus();
        },
        heal: function() {
            var healthGain = this.random(5, 10);
            this.playerHealth += healthGain;
            this.gameLog.push({"player": "Player used heal and gained " + healthGain + " HP"});
            
            this.monsterAttack(1, 5);
            
            this.checkStatus();
        },
        checkStatus: function() {
            if(this.playerHealth <= 0 && this.monsterHealth > 0) {
                if(confirm("You lost. \r\n Do you want to play another game?")) {
                    this.restartGame();
                }
            } else if(this.playerHealth > 0 && this.monsterHealth <= 0) {
                if(confirm("You won. \r\n Do you want to play another game?")) {
                    this.restartGame();
                }
            }
        },
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        restartGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameLog.splice(0, this.gameLog.length);
            this.inGame = false;
        },
        monsterAttack: function(min, max) {
            var playerHit = this.random(1, 5);
            this.playerHealth -= playerHit;
            this.gameLog.push({"monster": "Monster used attack and took " + playerHit + " HP"});
        },
        playerAttack: function(min, max) {
            var monsterHit = this.random(5, 20);
            this.monsterHealth -= monsterHit;
            this.gameLog.push({"player": "Player used attack and took " + monsterHit + " HP"});
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