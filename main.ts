controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        5 5 5 5 
        5 5 5 5 
        5 5 5 5 
        5 5 5 5 
        `, raket, 0, -50)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    music.wawawawaa.play()
    sprite.destroy()
    info.changeLifeBy(-1)
})
info.onLifeZero(function () {
    game.over(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.baDing.play()
    otherSprite.destroy()
    info.changeScoreBy(10)
    if (info.score() % 100 == 0) {
        level += 1
        scene.setBackgroundColor(randint(6, 15))
        game.splash("Level up")
    }
})
let alien: Sprite = null
let projectile: Sprite = null
let raket: Sprite = null
effects.starField.startScreenEffect()
info.setLife(3)
let level = 1
info.setScore(0)
raket = sprites.create(img`
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 2 2 1 2 2 2 2 2 2 . . . 
    . . . 2 2 2 1 2 2 2 2 2 2 . . . 
    . . . 2 2 2 1 2 2 2 2 2 2 . . . 
    . . . 2 2 2 1 2 2 2 2 2 2 . . . 
    . . . 2 2 2 1 2 2 2 2 2 2 . . . 
    . 2 2 2 2 2 1 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 1 1 1 1 1 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, SpriteKind.Player)
raket.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(raket)
game.onUpdateInterval(1000, function () {
    alien = sprites.create(img`
        . 4 4 4 4 4 4 . 
        4 . . . . . . 4 
        4 . . 4 4 . . 4 
        4 . 4 . . 4 . 4 
        4 . 4 . . 4 . 4 
        4 . . 4 4 . . 4 
        4 . . . . . . 4 
        . 4 4 4 4 4 4 . 
        `, SpriteKind.Enemy)
    alien.setPosition(randint(20, 140), 0)
    alien.setVelocity(randint(-20, 20), level * 10)
})
