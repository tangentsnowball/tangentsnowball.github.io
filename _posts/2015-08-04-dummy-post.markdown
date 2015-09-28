---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-08-04 12:12:03
categories: jekyll update
author: Andrew Sellick
image: /my/image/path
---

You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com

{% for member in site.data.members %}
	{% if member.name == page.author %}
		{% assign author = member %}
	{% endif %}
{% endfor %}

Author: {{ author.name }}
Github: {{ author.github }} 

