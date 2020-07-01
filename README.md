# shortcutlery

*shortcutlery* enables you to quickly open your favourite webpages from Spotlight.

## Getting Started

1.  Go to <shortcutlery.simonknott.de>, enter your shortcut's name
2.  Select the desired action - do you want to open a web page or run a shell command?
3.  Enter the web page / shell command
4.  Click "Create Shortcut"
5.  Unzip the downloaded file, move to /Applications, right-click > "Open" to make sure it works.
6.  Move to /Applications
7.  Open from Spotlight!

> Want to add crazy complicated shortcuts? Check out [Alfred](https://www.alfredapp.com).

### Why do I need to *trust* the Downloaded application first?

In order for an application to be considered *trustworthy* by macOS, a signature of an registered Apple Developer Program member is required.
Imagine somebody created a malicious shortcut - think "deleting all files" - using *shortcutlery* , I'd be the one to have signed off that application.
You see why that's not a good idea, I guess?

That's why *shortcutlery*'s shortcuts don't appear as *trustworthy* - because I don't want to put my name on potentially malicious code.

## About

I like to keep my setup vanilla, so using Alfred wasn't really an option for me.
But I still wanted to have web pages and macros available in Spotlight!
That's easy to accomplish using Apple's own [Automator](https://support.apple.com/guide/automator/welcome/mac), but it's cumbersome to use and little known amongst non-tech people.

That's why I created *shortcutlery*.
It basically takes a generic Automator  template and adjusts it to your likings.
All of that happens client-side, so it's privacy-friendly and easy to host.