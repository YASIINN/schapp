'use strict'
jQuery.sap.require("schapp.Component");
jQuery.sap.require("schapp.MyRouter");
var version = "1.0.0";
sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel'
  ],
  function (UIComponent, JSONModel) {
    return UIComponent.extend('schapp.Component', {
      metadata: {
        name: "schapp",
        version: "1.0.0",
        i18n: "i18n/i18n.properties",
        includes: [],
        dependencies: {
          libs: ["sap.m", "sap.ui.layout"],
          components: []
        },
        config: {
          resourceBundle: "i18n/messageBundle.properties",
        },
        routing: {
          config: {
            routerClass: sap.ui.demo.app.MyRouter,
            viewType: "XML",
            targetAggregation: "pages",
            clearTarget: false
          },
          routes: [
            {
              pattern: "",
              viewPath: "schapp.Application.Dashboard",
              name: "Dashboard",
              view: "DashboardRouterApp",
              targetControl: "masterView",
              transition: "show",
              cache: {
                keys: [version]
              },
              subroutes: [
                {
                  pattern: "Dashboard/Home",
                  viewPath: "schapp.Application.Dashboard.Home.view",
                  name: "Dashboard/Home",
                  view: "Home",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/ProjectEntry",
                  viewPath: "schapp.Application.Dashboard.ProjectEntry.view",
                  name: "Dashboard/ProjectEntry",
                  view: "ProjectEntry",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern:  "Dashboard/SectionUsers",
                  viewPath: "schapp.Application.Dashboard.SectionUsers.view",
                  name: "Dashboard/SectionUsers",
                  view: "SectionUsers",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/AllProjects",
                  viewPath: "schapp.Application.Dashboard.AllProjects.view",
                  name: "Dashboard/AllProjects",
                  view: "AllProjects",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/AddLesson",
                  viewPath: "schapp.Application.Dashboard.AddLesson.view",
                  name: "Dashboard/AddLesson",
                  view: "AddLesson",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/SectionOnUser",
                  viewPath: "schapp.Application.Dashboard.SectionOnUser.view",
                  name: "Dashboard/SectionOnUser",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/AllLesson",
                  viewPath: "schapp.Application.Dashboard.AllLesson.view",
                  name: "Dashboard/AllLesson",
                  view: "AllLesson",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/AcceptUsers",
                  viewPath: "schapp.Application.Dashboard.AcceptUsers.view",
                  name: "Dashboard/AcceptUsers",
                  view: "AcceptUsers",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/UserNoteFolder",
                  viewPath: "schapp.Application.Dashboard.UserNoteFolder.view",
                  name: "Dashboard/UserNoteFolder",
                  view: "UserNoteFolder",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/MyProjects",
                  viewPath: "schapp.Application.Dashboard.MyProjects.view",
                  name: "Dashboard/MyProjects",
                  view: "MyProjects",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/ProjectSelect",
                  viewPath: "schapp.Application.Dashboard.ProjectSelect.view",
                  name: "Dashboard/ProjectSelect",
                  view: "ProjectSelect",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  },
                },
                {
                  pattern: "Dashboard/AddUser",
                  viewPath: "schapp.Application.Dashboard.AddUser.view",
                  name: "Dashboard/AddUser",
                  view: "AddUser",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  }
                },
                {
                  pattern: "Dashboard/SystemSettings",
                  viewPath: "schapp.Application.Dashboard.SystemSettings.view",
                  name: "Dashboard/SystemSettings",
                  view: "SystemSettings",
                  targetControl: "DashboardRouterId",
                  transition: "show",
                  cache: {
                    keys: [version]
                  }
                }]
            },
            {
              pattern: "Register",
              viewPath: "schapp.Application.Register.view",
              name: "Register",
              view: "Register",
              targetControl: "masterView",
              transition: "show",
              cache: {
                keys: [version]
              },
            },
            {
              pattern: "Project",
              viewPath: "schapp.Application.Project",
              name: "Project",
              view: "ProjectRouterApp",
              targetControl: "masterView",
              transition: "show",
              cache: {
                keys: [version]
              },
              subroutes: [{
                pattern: "Project/ProjectOnLesson?{param}",
                viewPath: "schapp.Application.Project.ProjectOnLesson.view",
                name: "Project/ProjectOnLesson",
                view: "ProjectOnLesson",
                targetControl: "ProjectRouterId",
                transition: "show",
                cache: {
                  keys: [version]
                },
              },
              {
                pattern: "Project/ProjectOnCreated?{param}",
                viewPath: "schapp.Application.Project.ProjectOnCreated.view",
                name: "Project/ProjectOnCreated",
                view: "ProjectOnCreated",
                targetControl: "ProjectRouterId",
                transition: "show",
                cache: {
                  keys: [version]
                },
              },
              {
                pattern: "Project/ProjectUp?{param}",
                viewPath: "schapp.Application.Project.ProjectUp.view",
                name: "Project/ProjectUp",
                view: "ProjectUp",
                targetControl: "ProjectRouterId",
                transition: "show",
                cache: {
                  keys: [version]
                },
              }]
            },
            {
              pattern: "Lesson",
              viewPath: "schapp.Application.Lesson",
              name: "Lesson",
              view: "LessonRouterApp",
              targetControl: "masterView",
              transition: "show",
              cache: {
                keys: [version]
              },
              subroutes: [{
                pattern: "Lesson/LessonOnProject?{param}",
                viewPath: "schapp.Application.Lesson.LessonOnProject.view",
                name: "Lesson/LessonOnProject",
                view: "LessonOnProject",
                targetControl: "LessonRouterId",
                transition: "show",
                cache: {
                  keys: [version]
                },
              },
              {
                pattern: "Lesson/LessonCreatedUser?{param}",
                viewPath: "schapp.Application.Lesson.LessonCreatedUser.view",
                name: "Lesson/LessonCreatedUser",
                view: "LessonCreatedUser",
                targetControl: "LessonRouterId",
                transition: "show",
                cache: {
                  keys: [version]
                },
              },
              {
                pattern: "Lesson/LessonUd?{param}",
                viewPath: "schapp.Application.Lesson.LessonUd.view",
                name: "Lesson/LessonUd",
                view: "LessonUd",
                targetControl: "LessonRouterId",
                transition: "show",
                cache: {
                  keys: [version]
                },
              },
              ]
            },
            {
              pattern: "RegisterCheck",
              viewPath: "schapp.Application.RegisterCheck.view",
              name: "RegisterCheck",
              view: "RegisterCheck",
              targetControl: "masterView",
              transition: "show",
              cache: {
                keys: [version]
              },
            },
            {
              pattern: "Login",
              viewPath: "schapp.Application.Login.view",
              name: "Login",
              view: "Login",
              targetControl: "masterView",
              transition: "show",
              cache: {
                keys: [version]
              },
            },
          ]
        },
      },
      init: function () {
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        var mConfig = this.getMetadata().getConfig();
        this.getRouter().initialize();
      },
      createContent: function () {
        var oViewData = {
          component: this
        }
        return sap.ui.view({
          viewName: "schapp.MasterApp",
          type: sap.ui.core.mvc.ViewType.XML,
          id: "MasterAppid",
          viewData: oViewData,
        })
      }
    })
  }
)