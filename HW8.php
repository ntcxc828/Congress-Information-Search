<?php
    header('Access-Control-Allow-Origin:*');
    if($_GET['database']=='legislators'){
        $url="http://104.198.0.197:8080/legislators?apikey=90111d2def84420882cacee7d239a015&per_page=all";
        $json=file_get_contents($url);
        echo $json;
    }
    if(isset($_GET['member_ids'])){
        $url="http://104.198.0.197:8080/committees?&member_ids=".$_GET['member_ids']."&apikey=90111d2def84420882cacee7d239a015&per_page=5";
        $json=file_get_contents($url);
        echo $json;
    }
    if(isset($_GET['sponsor_ids'])){
        $url="http://104.198.0.197:8080/bills?&sponsor_id=".$_GET['sponsor_ids']."&apikey=90111d2def84420882cacee7d239a015&per_page=5";
        $json=file_get_contents($url);    
        echo $json;
    }
    if($_GET['database']=='bills' && $_GET['bill']=='active'){
        $url='http://104.198.0.197:8080/bills?last_version.urls.pdf__exists=true&history.active=true&order=introduced_on&apikey=90111d2def84420882cacee7d239a015&per_page=50';
        $json=file_get_contents($url);
        echo $json;
    }
    if($_GET['database']=='bills' && $_GET['bill']=="new"){
        $url="http://104.198.0.197:8080/bills?last_version.urls.pdf__exists=true&history.active=false&order=introduced_on&apikey=90111d2def84420882cacee7d239a015&per_page=50";
        $json=file_get_contents($url);
        echo $json;    
    }
    if($_GET['database']=='committees'){
        $url="http://104.198.0.197:8080/committees?apikey=90111d2def84420882cacee7d239a015&per_page=all";
        $json=file_get_contents($url);
        echo $json;
    }
    if(isset($_GET['bio_id'])){
        $url="http://104.198.0.197:8080/legislators?apikey=90111d2def84420882cacee7d239a015&bioguide_id=".$_GET['bio_id'];
        $json=file_get_contents($url);
        echo $json;
        
    }
    if(isset($_GET['bill_id'])){
        $url="http://104.198.0.197:8080/bills?apikey=90111d2def84420882cacee7d239a015&bill_id=".$_GET['bill_id'];
        $json=file_get_contents($url);
        echo $json;
        
    }
    if(isset($_GET['com_id'])){
        $url="http://104.198.0.197:8080/committees?apikey=90111d2def84420882cacee7d239a015&committee_id=".$_GET['com_id'];
        $json=file_get_contents($url);
        echo $json;
    }
?>
