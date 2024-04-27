document.addEventListener('DOMContentLoaded', () => {
    const cP = document.querySelector('#w2l');
    const cT = document.createElement('div');
    cP.appendChild(cT);
    cT.id = 'textoAnimado';
    cT.style.minHeight = '1.5em';
    cT.style.maxHeight = '1.5em';
    cT.style.display = 'block';
    cT.style.textAlign = 'center';
    cT.style.margin = '0';
    cT.style.width = 'auto';
    cT.style.whiteSpace = 'nowrap';
    cP.style.overflow = 'hidden';
    cP.style.display = 'flex';
    cP.style.justifyContent = 'center';
    cP.style.alignItems = 'center';

    const txts = Object.values(data);
    const m1 = document.createElement('span');
    m1.style.visibility = 'hidden';
    cP.appendChild(m1);
    let mw = 0;
    txts.forEach(t => {
        m1.innerText = t;
        mw = Math.max(mw, m1.offsetWidth + 3);
    });
    cT.style.minWidth = `${mw}px`;
    cP.removeChild(m1);

    let cTI = 0;
    let tA = txts[cTI];
    let idx = 0;
    let rev = false;
    let wait = false;

    const updateText = () => {
        if (!wait) {
            if (!rev) {
                cT.innerText = tA.slice(0, idx);
                idx++;
            } else {
                cT.innerText = tA.slice(0, idx);
                idx--;
            }

            if (idx > tA.length && !rev) {
                wait = true;
                setTimeout(() => {
                    wait = false;
                    rev = true;
                    idx--;
                }, 1000);
            } else if (idx < 0 && rev) {
                wait = true;
                setTimeout(() => {
                    wait = false;
                    rev = false;
                    cTI = (cTI + 1) % txts.length;
                    tA = txts[cTI];
                    idx = 0;
                }, 500);
            }
        }
    };

    setInterval(updateText, 100);
});
