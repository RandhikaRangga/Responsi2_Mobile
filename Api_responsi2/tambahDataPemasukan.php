<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$nama_transaksi=trim($data['nama_transaksi']);
$jumlah=trim($data['jumlah']);
http_response_code(201);
if($nama_transaksi!='' and $jumlah!=''){
 $query = mysqli_query($koneksi,"insert into pemasukan(nama_transaksi,jumlah) values('$nama_transaksi','$jumlah')");
 $pesan = true;
}else{
 $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);