picked = false
chorDakat = 'চোর'
header = document.querySelector('#header')

timeouts = []

chorAmount = 600
dakatAmount = 600
policeAmount = 500
babuAmount = 700

newGameDelay = 2500

score1 = 0
score2 = 0
score3 = 0
score4 = 0

game()

function game() {
    document.querySelector('.papers').style.display = 'flex'
    document.querySelector('#results').style.display = 'none'
    if (picked == false) {
        playersPapers = ['চোর', 'পুলিশ', 'ডাকাত', 'বাবু'].sort(() => Math.random() - 0.5)
        picked = true
        b = document.querySelector(`#p1`)
        timeouts.push(setTimeout(() => {
            b.style.backgroundColor = 'rgb(221, 190, 210)'
            b.style.borderColor = 'rgb(193, 165, 180)'
            timeouts.push(setTimeout(() => {
                b.innerHTML = playersPapers[0]
                ba = (playersPapers.indexOf('বাবু') + 1)
                po = (playersPapers.indexOf('পুলিশ') + 1)
                cho = (playersPapers.indexOf('চোর') + 1)
                da = (playersPapers.indexOf('ডাকাত') + 1)
                if (b.innerHTML != 'বাবু') {
                    babu = document.querySelector(`#p${(playersPapers.indexOf('বাবু') + 1).toString()}`)
                    eval(`score${(playersPapers.indexOf('বাবু') + 1).toString()} += babuAmount`)
                    babu.style.backgroundColor = 'rgb(148, 182, 210)'
                    babu.style.borderColor = 'rgb(122, 156, 168)'
                    timeouts.push(setTimeout(() => {
                        babu.innerHTML = 'বাবু'
                    }, 350))
                } else {score1 += babuAmount}
                if (b.innerHTML != 'পুলিশ') {
                    police = document.querySelector(`#p${(playersPapers.indexOf('পুলিশ') + 1).toString()}`)
                    police.style.backgroundColor = 'rgb(148, 182, 210)'
                    police.style.borderColor = 'rgb(122, 156, 168)'
                    timeouts.push(setTimeout(() => {
                        police.innerHTML = 'পুলিশ'
                        timeouts.push(setTimeout(() => {
                            pickn = [1, 2, 3, 4]
                            pickn.splice(pickn.indexOf(ba), 1)
                            pickn.splice(pickn.indexOf(po), 1)
                            pickn = pickn[Math.floor(Math.random() * pickn.length)]
                            pick = document.querySelector(`#p${pickn.toString()}`)
                            pick.style.backgroundColor = 'rgb(154, 220, 45)'
                            pick.style.borderColor = 'rgb(154, 235, 32)'
                            if (playersPapers[pickn - 1] == chorDakat) {
                                timeouts.push(setTimeout(() => {
                                    pick.innerHTML = chorDakat
                                    header.innerHTML = 'ঠিক'
                                    eval(`score${po.toString()} += policeAmount`)
                                    if (chorDakat = 'চোর') {eval(`score${da} += dakatAmount`)} else {eval(`score${cho} += chorAmount`)}
                                    timeouts.push(setTimeout(() => {reset()}, newGameDelay))
                                }, 350))
                            } else {
                                timeouts.push(setTimeout(() => {
                                    pick.innerHTML = playersPapers[pick.id.replace('p', '') - 1]
                                    header.innerHTML = 'ভুল'
                                    if (chorDakat = 'চোর') {eval(`score${cho} += policeAmount`)} else {eval(`score${da} += dakatAmount`); eval(`score${cho} += policeAmount`)} // change for konika version here
                                    timeouts.push(setTimeout(() => {reset()}, newGameDelay))
                                }, 350))
                            }
                        }, 700))
                    }, 350))
                } else {
                    document.querySelectorAll('.page').forEach(function(curPage) {
                        if (curPage.id.replace('p', '') != ba.toString() && curPage.id.replace('p', '') != '1') {
                            curPage.onclick = () => {
                                document.querySelectorAll('.page').forEach(function(curPage2) {
                                    curPage2.onclick = () => {}
                                })
                                curPage.style.backgroundColor = 'rgb(154, 220, 45)'
                                curPage.style.borderColor = 'rgb(154, 235, 32)'
                                timeouts.push(setTimeout(() => {
                                    chorDakat == 'চোর' ? choDa = 'cho' : choDa = 'da'
                                    if (curPage.id.replace('p', '') == eval(choDa).toString()) {
                                        header.innerHTML = 'ঠিক'
                                        curPage.innerHTML = chorDakat
                                        score1 += policeAmount
                                        chorDakat == 'চোর' ? eval(`score${da} += dakatAmount`) : eval(`score${cho} += chorAmount`);
                                    } else {
                                        header.innerHTML = 'ভুল'
                                        curPage.innerHTML = playersPapers[curPage.id.replace('p', '') - 1]
                                        if (chorDakat = 'চোর') {eval(`score${cho} += policeAmount`)} else {eval(`score${da} += dakatAmount`); eval(`score${cho} += policeAmount`)} // change for konika version here
                                    }
                                    timeouts.push(setTimeout(() => {reset()}, newGameDelay))
                                }, 350))
                            }
                        }
                    })
                }
            }, 350))
        }, 350))
    }
}

function reset() {
    picked = false
    chorDakat == 'চোর' ? chorDakat = 'ডাকাত' : chorDakat = 'চোর'
    document.querySelectorAll('.page').forEach(function(pg) {
        pg.innerHTML = ''
        pg.style.backgroundColor = 'rgb(180, 204, 224)'
        pg.style.borderColor = 'rgb(156, 183, 193)'
    })
    header.innerHTML = 'এবার ' + chorDakat
    playersPapers = playersPapers.sort(() => Math.random() - 0.5)
    game()
}

function results() {
    for (let i = 1; i <= timeouts.length; i++) {clearInterval(timeouts[i])}
    tex1 = document.querySelector('#s1').innerHTML
    tex2 = document.querySelector('#s2').innerHTML
    tex3 = document.querySelector('#s3').innerHTML
    tex4 = document.querySelector('#s4').innerHTML
    document.querySelector('.papers').style.display = 'none'
    document.querySelector('#results').style.display = 'flex'
    document.querySelector('#s1').innerHTML = document.querySelector('#s1').innerHTML + score1.toString()
    document.querySelector('#s2').innerHTML = document.querySelector('#s2').innerHTML + score2.toString()
    document.querySelector('#s3').innerHTML = document.querySelector('#s3').innerHTML + score3.toString()
    document.querySelector('#s4').innerHTML = document.querySelector('#s4').innerHTML + score4.toString()
    for (let i = 1; i <= 4; i++) {if (eval(`score${i}`) == 0) {eval(`document.querySelector('#s${i}').innerHTML = tex${i} + '000'`)}}
}
