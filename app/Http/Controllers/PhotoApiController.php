<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Library\Instagraph\InstagraphEffect;
use File;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class PhotoApiController extends Controller
{
    /**
     * bubbles colorise sepia sepia2
     * sharpen emboss cool old old2
     * old3 light aqua boost boost2 gray
     * antique blackwhite blur vintage
     * concentrate hermajesty everglow
     * freshblue tender dream frozen
     * forest rain orangepeel darken
     * summer retro country washed
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {

        $filter = $request->input("filter");

        $path = public_path() . "/photos";

        $pathToSourceImage = $path . "/source.jpg";


        /** @noinspection PhpUndefinedMethodInspection */
        $img = Image::make($pathToSourceImage)->heighten(900, function ($constraint) {
            /** @noinspection PhpUndefinedMethodInspection */
            $constraint->upsize();
        });
        /** @noinspection PhpUndefinedMethodInspection */
        $img->save($pathToSourceImage);

        $instagraphEffect = new InstagraphEffect($pathToSourceImage);
        $instagraphEffect->applyEffect($filter);
       $instagraphEffect->save($path.'/effect.jpg');

        return;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $path = public_path() . "/photos";

        File::cleanDirectory($path);

        $photo = $request->file("photo");
        $photo->move("photos", "source.jpg");

        $pathToSourceImage = $path . "/source.jpg";

        $pathToDestImage = $path . "/dest.jpg";

        if (!File::copy($pathToSourceImage, $pathToDestImage)) {
            die("Couldn't copy file");
        }

        /** @noinspection PhpUndefinedMethodInspection */
        $img = Image::make($pathToDestImage)->heighten(450, function ($constraint) {
            /** @noinspection PhpUndefinedMethodInspection */
            $constraint->upsize();
        });
        /** @noinspection PhpUndefinedMethodInspection */
        $img->save($pathToDestImage);

        $listOfNames = InstagraphEffect::applyAllEffects($pathToDestImage, $path);


        return array_map(function (array $filters) {
            $fileName = $filters[0];
            $filters[0] = "/photos/" . $fileName;
            return $filters;
        }, $listOfNames);
    }

    public function edit($id, Request $request) {

    }

}
