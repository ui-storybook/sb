let overview = sb.section('Demo');
overview.story('User statistic')
  .add('Week chart', '<p>User statistic</p>');

let survey = sb.section('Demo 2');
survey.story('Dayli plans')
  .add('Global', '<p>{{ vm.day }}</p>', {
    day: 'Monday'
  });

let test = sb.section('Demo 3');
test.story('Test')
    .add('Test', '<test text="{{vm.text}}"></test>', {
        text: 'Monday'
    });
