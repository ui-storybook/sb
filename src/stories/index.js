import './mock';
import docs from './docs.md';

let survey = sb.section('The week');
survey.story('Names of the days of the week')
    .add('Sunday', '<p>{{ vm.sunday }}</p>', 'week', docs)
    .add('Monday', '<p>{{ vm.monday }}</p>', 'week', docs)
    .add('Tuesday', '<p>{{ vm.tuesday }}</p>', 'week', docs)
    .add('Wednesday', '<p>{{ vm.wednesday }}</p>', 'week', docs)
    .add('Thursday', '<p>{{ vm.thursday }}</p>', 'week', docs)
    .add('Friday', '<p>{{ vm.friday }}</p>', 'week', docs)
    .add('Saturday', '<p>{{ vm.saturday }}</p>', 'week', docs);

let test = sb.section('Demo 3');
test.story('Test')
    .add('Test', '<test text="{{vm.text}}"></test>', {
        text: 'Monday'
    });
