angular.module('badgeApp').controller('calendarCtrl', function($scope, userService, $state) {
	
	//If user is not logged in, redirect to login page
if(!userService.currentUser){
	$state.go('login')
	return
}
	
	
	
	
	$(document).ready(() =>{
		
		$('#external-events .fc-event').each(() =>{
			
			// store data so the calendar knows to render an event upon drop,
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the event title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});
			
			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
			
		});
		
		$('#calendar').fullCalendar({
			googleCalendarApiKey: 'AIzaSyAFcks9Xx01nvniP3PTml4hTithgQIsiN8',
			eventSources: [
				{
					googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
					color: '#58bc79'
				},
				{
					googleCalendarId: 'dmcalendarproject@gmail.com'
				},
				{
					googleCalendarId: 'devmounta.in_861odqeu3oqimb7t8939om6mlg@group.calendar.google.com'
				}
			],
			eventColor: '#3BB3E4',
			theme: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			droppable: false, // this allows things to be dropped onto the calendar
			select: (start, end) => {
				var title = prompt('Event Title:');
				var eventData;
				console.log('hello');
				
				if (title) {
					eventData = {
						title: title,
						start: start,
						end: end
					};
					$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
				}
				$('#calendar').fullCalendar('unselect');
			},
			drop: () => {
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
			},
			editable: false,
			eventLimit: true,
			eventClick: (event) => {
				if (event.url) {
					return false;
				}
			}
		});
	});
});
