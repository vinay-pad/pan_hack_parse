Parse.initialize("RnsDdfZemEz0bGQoqMQE4JyyfSLcdJmqTreY5QD9",
                        "Tf6nXHAxS0L4bTshQFWefQ3rYljrmO2JHPWWNeKo");
  
  
  
Parse.Cloud.define("TESTFUNC", function(request, response) {
  var query = new Parse.Query("NAMES");
  query.equalTo("FirstName", request.params.FirstName);
  query.find({
    success: function(results) {
    var lname = ""
    for (var i = 0; i < results.length; ++i) {
            lname += results[i].get("LastName");
        }
    response.success(lname);
    },
    error: function() {
      response.error("Invalid team member!! :D ");
    }
  });
});
  
Parse.Cloud.define("ADDNAMES", function(request, response) {
    var BlogPost = Parse.Object.extend("NAMES");
    var blogPost = new BlogPost();
    var Fname = request.params.FirstName;
    var Lname = request.params.LastName;
   
    blogPost.save({
        "FirstName": Fname,
        "LastName": Lname
    }, {
    success: function(blogPost) {
      
        response.success("The object was saved successfully.");
    },
    error: function(blogPost, error) {
    response.error("// The save failed.");
    }
    });
  
});
  
Parse.Cloud.define("ADD_FW_DETAILS", function(request, response) {
          
    var FW = request.params.FWName
        var Health = request.params.Health;
    var Region = request.params.Region;
  
    var BlogPost = Parse.Object.extend(FW);
        var blogPost = new BlogPost();
  
        blogPost.save({
                "Health": Health,
                "Region": Region
        }, {
        success: function(blogPost) {
  
                response.success("The object was saved successfully.");
        },
        error: function(blogPost, error) {
        response.error("// The save failed.");
        }
        });
  
});
  
  
Parse.Cloud.define("UPDATE_CLOUD", function(request, response) {
  
        var FW = request.params.FWName
        var Connected = request.params.Connected;
  
        var BlogPost = Parse.Object.extend(FW);
        var blogPost = new BlogPost();
  
        blogPost.save({
                        "Connected": Connected
                }, {
                success: function(blogPost) {
  
                        response.success("The object was saved successfully.");
                },
                error: function(blogPost, error) {
                response.error("// The save failed.");
                }
                });
          
    if( Connected == "1") {
          
        Parse.Push.send({
        channels: [ "ALERT" ],
        data: {
                alert: "This is a threat alert...",
            title: "THREAT",
        }
        }, {
            success: function() {
                // Push was successful
        },
            error: function(error) {
                // Handle error
        }
        });
  
    } else {
          
                Parse.Push.send({
                channels: [ "ALERT" ],
                data: {
                        alert: "This is a system log alert",
                        title: "SYSTEMLOG",
                }
                }, {
                        success: function() {
                        // Push was successful
                },
                        error: function(error) {
                        // Handle error
                }
                }); 
  
  
  
    }
  
});
  
  
  
Parse.Cloud.define("UPDATE_FW_STATUS", function(request, response) {
  
        var FW = request.params.FWName
        var Connected = request.params.Connected;
  
    var FW_conn = FW + "_conn";
  
        var BlogPost = Parse.Object.extend(FW_conn);
        var blogPost = new BlogPost();
  
                blogPost.save({
                        "Connected": Connected
                }, {
                success: function(blogPost) {
  
                        response.success("The object was saved successfully.");
            if( Connected == "0") {
          
                Parse.Push.send({
                channels: [ "ALERT" ],
                data: {
                    alert: "Firewall disconnected...",
                    title: "Connection Status",
                uri: FW 
                }
                }, {
                    success: function() {
                    // Push was successful
                },
                    error: function(error) {
                    // Handle error
                }
                });
            }
                },
                error: function(blogPost, error) {
                response.error("// The save failed.");
                }
                });
  
  
});
 
Parse.Cloud.define("UPDATE_THREAT_ALERT_STATUS", function(request, response) {
  
        var threat_alert_fwname = request.params.threat_alert_fwname
        var threat_alert_fw_ipaddr = request.params.threat_alert_fw_ipaddr;
    var threat_receive_time = request.params.threat_receive_time;
    var threat_subtype = request.params.threat_subtype;
    var threat_time_generated = request.params.threat_time_generated;
    var threat_source = request.params.threat_source;
    var threat_dst = request.params.threat_dst;
    var threat_rule = request.params.threat_rule;
    var threat_name = request.params.threat_name;
    var threat_category = request.params.threat_category;
    var threat_severity = request.params.threat_severity;
  
    var FW_conn = threat_alert_fwname + "_threat_alert";
  
        var BlogPost = Parse.Object.extend(FW_conn);
        var blogPost = new BlogPost();
  
                blogPost.save({
                        "threat_alert_fwname": threat_alert_fwname,
            "threat_alert_fw_ipaddr" : threat_alert_fw_ipaddr,
            "threat_receive_time" : threat_receive_time,
            "threat_subtype" : threat_subtype,
            "threat_time_generated" : threat_time_generated,
            "threat_source" : threat_source,
            "threat_dst" : threat_dst,
            "threat_rule" : threat_rule,
            "threat_name" : threat_name,
            "threat_category" : threat_category,
            "threat_severity" : threat_severity
                }, {
                success: function(blogPost) {
  
                        response.success("The object was saved successfully.");
            Parse.Push.send({
                channels: [ "ALERT" ],
                data: {
                    alert: "This is a threat alert",
                    title: "THREAT",
                    uri: threat_alert_fwname
                }
            }, {
                success: function() {
                // Push was successful
            },
                error: function(error) {
                // Handle error
            }
            });
                },
                error: function(blogPost, error) {
                response.error(String(error.message));
                }
                });
  
});
 
 
Parse.Cloud.define("UPDATE_SYS_ALERT_STATUS", function(request, response) {
     
      
    sys_fwname = request.params.sys_fwname;
    sys_logtype = request.params.sys_logtype;
    sys_logsubtype =  request.params.sys_logsubtype;
    sys_logtime_generated = request.params.sys_logtime_generated;
    sys_logseverity = request.params.sys_logseverity;
    sys_log_opaque = request.params.sys_log_opaque;
 
    var FW_conn = sys_fwname + "_sys_alert";
  
        var BlogPost = Parse.Object.extend(FW_conn);
        var blogPost = new BlogPost();
  
                blogPost.save({
            "sys_fwname": sys_fwname,
            "sys_logtype" : sys_logtype,
            "sys_logsubtype" :  sys_logsubtype,
            "sys_logtime_generated" : sys_logtime_generated,
            "sys_logseverity" : sys_logseverity,
            "sys_log_opaque" : sys_log_opaque
                }, {
                success: function(blogPost) {
  
                        response.success("The object was saved successfully.");
            Parse.Push.send({
                channels: [ "ALERT" ],
                data: {
                    alert: "This is a system log alert",
                    title: "System Log",
                    uri: sys_fwname
                }
            }, {
                success: function() {
                // Push was successful
            },
                error: function(error) {
                // Handle error
            }
            });
  
                },
                error: function(blogPost, error) {
                response.error(String(error.message));
                }
                });
 
});
 
Parse.Cloud.define("UPDATE_INFO_STATUS", function(request, response) {
     
        fw_name = request.params.name;
                total_cpu = request.params.total_cpu;
                mgmtsrvr_cpu = request.params.mgmtsrvr_cpu;
                logrcvr_cpu = request.params.logrcvr_cpu;
                ip = request.params.ip;
                opt_pancfg_usage = request.params.opt_pancfg_usage;
                opt_panrepo_usage =  request.params.opt_panrepo_usage;
                dev_shm_usage = request.params.dev_shm_usage;
                opt_panlogs_usage = request.params.opt_panlogs_usage;
                total_mem = request.params.total_mem;
                mgmtsrvr_mem = request.params.mgmtsrvr_mem;
                logrcvr_mem = request.params.logrcvr_mem;
                lograte = request.params.lograte;
                throughput = request.params.throughput;
                active_sess = request.params.active_sess;
                ha_status = request.params.ha_status;
                conn_status = request.params.conn_status;
 
    var FW_conn = fw_name + "_status";
  
        var BlogPost = Parse.Object.extend(FW_conn);
        var blogPost = new BlogPost();
  
                blogPost.save({
            "fw_name": fw_name,
            "total_cpu" : total_cpu,
            "mgmtsrvr_cpu" :  mgmtsrvr_cpu,
            "logrcvr_cpu" : logrcvr_cpu,
            "ip" : ip,
            "opt_pancfg_usage" : opt_pancfg_usage,
            "opt_panrepo_usage" : opt_panrepo_usage,
            "dev_shm_usage" : dev_shm_usage,
            "opt_panlogs_usage" : opt_panlogs_usage,
            "total_mem" : total_mem,
            "mgmtsrvr_mem" : mgmtsrvr_mem,
            "logrcvr_mem" : logrcvr_mem,
            "lograte" : lograte,
            "throughput" : throughput,
            "active_sess" : active_sess,
            "ha_status" : ha_status,
            "conn_status" : conn_status
                }, {
                success: function(blogPost) {
  
                        response.success("The object was saved successfully.");
  
                },
                error: function(blogPost, error) {
                response.error(String(error.message));
                }
                });





