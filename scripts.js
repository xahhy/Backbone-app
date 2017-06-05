/**
 * Created by hhy on 2017/6/5.
 */
//Backbone Model
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

//Backbone Collection
var Blogs = Backbone.Collection.extend({

});

//instantiate 2 Blogs

var blog1 = new Blog({
    author:'Michael',
    title: 'Michael\'s Blog',
    url:'http://michaelsblog.com'
});
var blog2 = new Blog({
    author:'John',
    title: 'John\'s Blog',
    url:'http://john.com'
});

//instantiate a Collection

var blogs = new Blogs([blog1,blog2]);

//Backbone Views
//Backbone View for one blog
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blogs-list-template').html())
    },
    render: function () {
        this.$el.html(this.template(
            this.model.toJSON()
        ));
        return this;
    }
});
//Backbone View for all blogs
var BlogsView = Backbone.View.extend({
    model:blogs,
    el: $('.blogs-list'),
    initialize:function () {
        this.model.on('add',this.render,this);
    },
    render:function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(),function (blog) {
            self.$el.append((new BlogView({model:blog})).render().$el);
        });
        return this;
    }
});
var blogsView = new BlogsView();
$(function () {
    blogs.add(blog1);
    blogs.add(blog1);
});