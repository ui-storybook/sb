import './mock';

let survey = sb.section('The week');
survey.story('Names of the days of the week')
  .add('Sunday', '<p>{{ vm.sunday }}</p>', 'week')
  .add('Monday', '<p>{{ vm.monday }}</p>', 'week')
  .add('Tuesday', '<p>{{ vm.tuesday }}</p>', 'week')
  .add('Wednesday', '<p>{{ vm.wednesday }}</p>', 'week')
  .add('Thursday', '<p>{{ vm.thursday }}</p>', 'week')
  .add('Friday', '<p>{{ vm.friday }}</p>', 'week')
  .add('Saturday', '<p>{{ vm.saturday }}</p>', 'week');

let test = sb.section('Demo 3');
test.story('Test')
    .add('Test', '<test text="{{vm.text}}"></test>', {
        text: 'Monday'
    });
