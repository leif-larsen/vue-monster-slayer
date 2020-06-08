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
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameLog.splice(0, this.gameLog.length);
            this.inGame = false;
        },
        attack: function() {
            this.monsterHealth -= 5;
            this.gameLog.push("Player used attack");
        },
        specialAttack: function() {
            this.monsterHealth -= 20;
            this.gameLog.push("Player used super attack");
        },
        heal: function() {
            this.gameLog.push("Player used heal");
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