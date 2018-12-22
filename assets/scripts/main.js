const collapseBtn = document.getElementById('collapseBtn');
const navigation = document.getElementsByClassName('navigation');

collapseBtn.addEventListener('click', function(e){
  collapseBtn.setAttribute('aria-pressed', e.target.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  navigation[0].setAttribute('style', navigation[0].getAttribute('style') === 'display: block;' ? '' : 'display: block;');
});