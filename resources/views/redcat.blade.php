@extends('layout')

@section('content')
    <div id="content" class="app-content box-shadow-0" role="main">

        <div class="content-main " id="content-main">

            <!--Begin the RedCat test content-->
            <section class="p-4">
                <div class="row no-gutter">
                    <div class="col-md-3">
                        @include('components.dropzone')
                    </div>

                    <div class="col-md-9">
                        @include('components.datatable')
                    </div>

                </div>
            </section>
            <!-- End the RedCat test content -->

        </div>

    </div>
@endsection