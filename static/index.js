try {
  const TARGET = '/data';

  function draw(data) {
    const departmendElement = document.querySelector('#department');
    const nameElement = document.querySelector('#name');
    const studentIDElement = document.querySelector('#studendID');
    let t,seq = 0;
    const increase = () => (seq = seq+1 >= data.length ? 0 : seq + 1);
    return {
      start() {
        t = setInterval(() => {
          const { department, name, studentID } = data[seq];
          departmendElement.innerHTML = department;
          nameElement.innerHTML = name;
          studentIDElement.innerHTML = studentID;
          increase();
        })
      },
      stop() {
        clearInterval(t);
      }
    }
  }

  fetch(TARGET)
    .then(async response => {
      let flag = false;
      const data = await response.json();
      const { start, stop } = draw(data);
      window.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
          if (flag) {
            stop();
          }
          else {
            start();
          }
          flag = !flag;
        }
      })
    })
    .catch((e) => {
      document.write('ERROR:  ');
      document.write(e);
      document.close();
    })
}
catch (e) {
  window.location = `https://www.baidu.com/s?ie=UTF-8&wd=${e}`
}