const createOptionsForm = () => {
    const optionForm = document.createElement('div');
    optionForm.className = 'option-form';

    const singleLabel = document.createElement('label');
    singleLabel.setAttribute('for', 'single-player');
    singleLabel.innerHTML = 'Single Player'
    const br = document.createElement('br');
    const singleInput = document.createElement('input');
    singleInput.setAttribute('type', 'checkbox');
    singleInput.setAttribute('id', 'single-player');
    singleLabel.onclick = onChooseSingle;

    const multiLabel = document.createElement('label');
    multiLabel.setAttribute('for', 'multi-player');
    multiLabel.innerHTML = 'Multi Player'
    const multiInput = document.createElement('input');
    multiInput.setAttribute('type', 'checkbox');
    multiInput.setAttribute('id', 'multi-player');
    multiLabel.onclick = onChooseMulti;

    const append = [singleLabel, br, singleInput, multiLabel, multiInput];
    append.forEach(el => {
        optionForm.appendChild(el);
    });

    board.appendChild(optionForm);
}