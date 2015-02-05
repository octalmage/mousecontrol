// setup of the html

var x = 50;
var y = 50;
var w = $(document).width();
var h = $(document).height();

var lock = 0;
var click = 0;

//window.addEventListener('load', eventWindowLoaded, false);
var html = document.querySelector('html');

function mouseMove(mx, my)
{
	x = mx;
	y = my;

	$('#maccursor').css('left', x).css('top', y);
}

$(function()
{
	$("#testButton").on("click", function(e)
	{
		mouseMove(x + 100, y + 100);
	});
});

// pointer lock object forking for cross browser

document.requestPointerLock = html.requestPointerLock ||
	html.mozRequestPointerLock ||
	document.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
	document.mozExitPointerLock ||
	document.webkitExitPointerLock;
//document.exitPointerLock();

html.onclick = function(e)
{
	if (lock == 0)
	{
		lock = 1;
		x = e.clientX;
		y = e.clientY;
		html.requestPointerLock();
		$('#maccursor').css('left', x).css('top', y);
	}
	else
	{
		if (click == 0)
		{
			click = 1;
			$(document.elementFromPoint(x, y + 10)).click();
			setTimeout(function()
			{
				click = 0;
			}, 100);
		}
	}

}

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

function lockChangeAlert()
{
	if (document.pointerLockElement === html ||
		document.mozPointerLockElement === html ||
		document.webkitPointerLockElement === html)
	{
		console.log('The pointer lock status is now locked');
		document.addEventListener("mousemove", htmlLoop, false);
	}
	else
	{
		console.log('The pointer lock status is now unlocked');
		document.removeEventListener("mousemove", htmlLoop, false);
	}
}

var tracker = document.createElement('p');
var body = document.querySelector('body');
body.appendChild(tracker);
tracker.style.position = 'absolute';
tracker.style.top = '0';
tracker.style.right = '10px';
tracker.style.backgroundColor = 'white';

function htmlLoop(e)
{

	var movementX = e.movementX ||
		e.mozMovementX ||
		e.webkitMovementX ||
		0;

	var movementY = e.movementY ||
		e.mozMovementY ||
		e.webkitMovementY ||
		0;

	x += movementX;
	y += movementY;

	if (x >= w + 20)
	{
		x = w + 20;
	}
	else if (x <= 0)
	{
		x = 0;
	}

	if (y >= h + 25)
	{
		y = h + 25;
	}
	else if (y <= 0 - 25)
	{
		y = 0 - 25;
	}

	$('#maccursor').css('left', x - 20).css('top', y + 7);

	var animation = requestAnimationFrame(htmlLoop);

	tracker.innerHTML = "X position: " + x + ', Y position: ' + y;
}