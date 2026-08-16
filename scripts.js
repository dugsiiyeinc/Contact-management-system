    // data holds all contacts
    // it comes from localStorage so it stays saved even after you refresh or close the page
    var saved1 = localStorage.getItem('mydata');
    var data = [];
    if (saved1) {
      data = JSON.parse(saved1);
    }

    // form inputs
    var form1 = document.getElementById('form1');
    var id1 = document.getElementById('id1');
    var name1 = document.getElementById('name1');
    var phone1 = document.getElementById('phone1');
    var email1 = document.getElementById('email1');
    var company1 = document.getElementById('company1');
    var address1 = document.getElementById('address1');
    var cat1 = document.getElementById('cat1');

    // where we show the contacts
    var list1 = document.getElementById('list1');
    var list2 = document.getElementById('list2');
    var total1 = document.getElementById('total1');
    var search1 = document.getElementById('search1');

    var currentFilter = 'All';

    // switch between the 4 pages
    function showPage(pageId, tabBtn) {
      var pages = document.querySelectorAll('.page');
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
      }

      var tabs = document.querySelectorAll('.tab');
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
      }

      document.getElementById(pageId).classList.add('active');
      tabBtn.classList.add('active');

      if (pageId === 'page1') {
        showList();
      }
      if (pageId === 'page4') {
        showReport();
      }
    }

    // save data into localStorage so it does not get lost
    function saveData() {
      localStorage.setItem('mydata', JSON.stringify(data));
    }

    // build the HTML for one contact
    function makeCard(person) {
      var company2 = person.company;
      if (!company2) {
        company2 = 'N/A';
      }

      var html = '<div class="item">';
      html += '<div>';
      html += '<strong>' + person.name + '</strong> (' + person.cat + ')<br>';
      html += '<small>Phone: ' + person.phone + ' | Email: ' + person.email + ' | Company: ' + company2 + '</small>';
      html += '</div>';
      html += '<div class="btns">';
      html += '<button class="editbtn" onclick="editPerson(' + person.id + ')">Edit</button>';
      html += '<button class="delbtn" onclick="deletePerson(' + person.id + ')">Delete</button>';
      html += '</div>';
      html += '</div>';

      return html;
    }

    // show all contacts, or only the ones in the selected filter
    function showList() {
      total1.textContent = 'Total: ' + data.length;

      var show1 = [];

      for (var i = 0; i < data.length; i++) {
        var person = data[i];
        if (currentFilter === 'All' || person.cat === currentFilter) {
          show1.push(person);
        }
      }

      if (show1.length === 0) {
        list1.innerHTML = '<p class="box">No contacts found.</p>';
        return;
      }

      var out1 = '';
      for (var j = 0; j < show1.length; j++) {
        out1 += makeCard(show1[j]);
      }
      list1.innerHTML = out1;
    }

    // runs when a filter button is clicked
    function filterList(cat, btn) {
      currentFilter = cat;

      var fbtns = document.querySelectorAll('.fbtn');
      for (var i = 0; i < fbtns.length; i++) {
        fbtns[i].classList.remove('active');
      }
      btn.classList.add('active');

      showList();
    }

    // runs when the Add/Edit form is submitted
    form1.addEventListener('submit', function (e) {
      e.preventDefault();

      var oldId = id1.value;

      var person1 = {
        id: oldId ? Number(oldId) : Date.now(),
        name: name1.value,
        phone: phone1.value,
        email: email1.value,
        company: company1.value,
        address: address1.value,
        cat: cat1.value
      };

      if (oldId) {
        // editing: find the old contact and replace it
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === Number(oldId)) {
            data[i] = person1;
          }
        }
      } else {
        // adding a new contact
        data.push(person1);
      }

      saveData();
      form1.reset();
      id1.value = '';
      document.getElementById('title1').textContent = 'Add New Contact';

      showPage('page1', document.querySelectorAll('.tab')[0]);
    });

    // delete one contact
    function deletePerson(pid) {
      var sure1 = confirm('Are you sure you want to delete this contact?');
      if (sure1) {
        var newData = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].id !== pid) {
            newData.push(data[i]);
          }
        }
        data = newData;
        saveData();
        showList();
      }
    }

    // put a contact's info into the form so it can be edited
    function editPerson(pid) {
      var found1 = null;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === pid) {
          found1 = data[i];
        }
      }

      if (found1) {
        id1.value = found1.id;
        name1.value = found1.name;
        phone1.value = found1.phone;
        email1.value = found1.email;
        company1.value = found1.company;
        address1.value = found1.address;
        cat1.value = found1.cat;

        document.getElementById('title1').textContent = 'Edit Contact';
        showPage('page2', document.querySelectorAll('.tab')[1]);
      }
    }

    // delete every contact
    function clearAll() {
      var sure2 = confirm('Are you sure you want to delete ALL contacts? This cannot be undone!');
      if (sure2) {
        data = [];
        saveData();
        showList();
      }
    }

    // fill in the numbers on the report page
    function showReport() {
      var c1 = 0;
      var c2 = 0;
      var c3 = 0;

      for (var i = 0; i < data.length; i++) {
        if (data[i].cat === 'Family') {
          c1++;
        }
        if (data[i].cat === 'Work') {
          c2++;
        }
        if (data[i].cat === 'Customers') {
          c3++;
        } 
        if (data[i].cat === 'Friends') {
        c4++;
}    
      }

      document.getElementById('r1').textContent = data.length;
      document.getElementById('r2').textContent = c1;
      document.getElementById('r3').textContent = c2;
      document.getElementById('r4').textContent = c3;
    }

    // search box: show matching contacts as you type
    search1.addEventListener('input', function (e) {
      var term = e.target.value.toLowerCase();
      var result1 = [];

      for (var i = 0; i < data.length; i++) {
        var person = data[i];
        var m1 = person.name.toLowerCase().indexOf(term) !== -1;
        var m2 = person.phone.indexOf(term) !== -1;
        var m3 = person.email.toLowerCase().indexOf(term) !== -1;
        var m4 = person.company && person.company.toLowerCase().indexOf(term) !== -1;

        if (m1 || m2 || m3 || m4) {
          result1.push(person);
        }
      }

      if (result1.length === 0) {
        list2.innerHTML = '<p class="box">No results found.</p>';
        return;
      }

      var out2 = '';
      for (var j = 0; j < result1.length; j++) {
        out2 += makeCard(result1[j]);
      }
      list2.innerHTML = out2;
    });

    // show the list when the page first loads
    showList();
  