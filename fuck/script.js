let btn = document.querySelector('button');
let select = document.querySelector('select');
let fuck = document.querySelector('h1');
select.addEventListener('change', (e) => {
  fuck.innerText = select.value;
});
btn.addEventListener('click', () => {
  select.value = 'marks';
  triggerChange(select);
});
function triggerChange(element) {
  console.log(element);
  let changeEvent = new Event('change');
  element.dispatchEvent(changeEvent);
}
