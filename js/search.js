import COURSES from '../data/courses.js'

document.getElementById('search-item').addEventListener('input', e => updateSearch(e.target.value));

function updateSearch(search) {
    search.trim().toLowerCase();
    const coursesToDisp = search ? COURSES.filter(c => c.title.toLowerCase().includes(search)) : COURSES;
    const cards = document.getElementsByClassName('course__item');


    for (const card of cards) {
        let id = +card.getAttribute('data-id');
        console.log(id);
        if (coursesToDisp.some(c => c.id === id))
            card.classList.remove('hidden');
        else
            card.classList.add('hidden');
    }

    if (coursesToDisp.length === 0)
        document.getElementById('no_course').classList.remove('hidden');
    else
        document.getElementById('no_course').classList.add('hidden');

}
